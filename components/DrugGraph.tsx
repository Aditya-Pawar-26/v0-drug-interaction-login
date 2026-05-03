'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface Interaction {
  drugA: string
  drugB: string
  severity: 'major' | 'moderate' | 'minor'
}

interface DrugGraphProps {
  drugs: string[]
  interactions: Interaction[]
}

export function DrugGraph({ drugs, interactions }: DrugGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null)
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 })

  // Handle container resize
  useEffect(() => {
    const updateSize = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!svgRef.current || drugs.length === 0) return

    const width = containerSize.width
    const height = containerSize.height

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])

    // Add defs for gradients and animations
    const defs = svg.append('defs')

    // Pulsing glow filter for major interactions
    const filter = defs
      .append('filter')
      .attr('id', 'glow')
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '300%')
      .attr('height', '300%')

    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur')

    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Create graph data
    const nodes: d3.SimulationNodeDatum[] = drugs.map((drug) => ({
      id: drug,
      name: drug,
      fx: undefined,
      fy: undefined,
    }))

    const links = interactions.map((interaction) => ({
      source: interaction.drugA,
      target: interaction.drugB,
      severity: interaction.severity,
    }))

    // Create simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink<any, any>(links)
          .id((d: any) => d.id)
          .distance(80)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))

    simulationRef.current = simulation

    // Create link elements
    const link = svg
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d: any) => {
        if (d.severity === 'major') return '#ef4444'
        if (d.severity === 'moderate') return '#eab308'
        return '#22c55e'
      })
      .attr('stroke-width', (d: any) => {
        if (d.severity === 'major') return 3
        if (d.severity === 'moderate') return 2
        return 1.5
      })
      .attr('opacity', 0.6)

    // Create node groups
    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-group')
      .style('opacity', 0)
      .transition()
      .duration(600)
      .style('opacity', 1)

    // Add circles
    const circles = nodeGroup
      .append('circle')
      .attr('r', 28)
      .attr('fill', '#01696f')
      .attr('class', (d: any) => {
        const hasMajor = interactions.some(
          (i) =>
            (i.drugA === d.id && i.severity === 'major') ||
            (i.drugB === d.id && i.severity === 'major')
        )
        return hasMajor ? 'node-major' : 'node'
      })

    circles.style('filter', (d: any) => {
      const hasMajor = interactions.some(
        (i) =>
          (i.drugA === d.id && i.severity === 'major') ||
          (i.drugB === d.id && i.severity === 'major')
      )
      return hasMajor ? 'url(#glow)' : 'none'
    })

    // Add text labels
    nodeGroup
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2em')
      .attr('class', 'node-label')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', '#334155')
      .attr('pointer-events', 'none')
      .text((d: any) => d.name)

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (d.source as any).x)
        .attr('y1', (d: any) => (d.source as any).y)
        .attr('x2', (d: any) => (d.target as any).x)
        .attr('y2', (d: any) => (d.target as any).y)

      nodeGroup.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    // Restart simulation when drugs change
    simulation.nodes(nodes)
    simulation.force<any>('link').links(links)
    simulation.alpha(1).restart()

    return () => {
      simulation.stop()
    }
  }, [drugs, interactions, containerSize])

  // Add CSS styles for pulsing animation
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes pulse-glow {
        0%, 100% {
          filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.4));
        }
        50% {
          filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.8));
        }
      }
      
      .node-major {
        animation: pulse-glow 2s ease-in-out infinite;
      }
      
      .node-label {
        user-select: none;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  if (drugs.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 font-medium">Add drugs to see interaction graph</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Select medications from the left panel</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
