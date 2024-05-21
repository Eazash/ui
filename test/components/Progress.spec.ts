import { describe, it, expect } from 'vitest'
import Progress, { type ProgressProps, type ProgressSlots } from '../../src/runtime/components/Progress.vue'
import ComponentRender from '../component-render'
import theme from '#build/ui/progress'

describe('Progress', () => {
  const sizes = Object.keys(theme.variants.size) as any
  const colors = Object.keys(theme.variants.color) as any
  const orientations = Object.keys(theme.variants.orientation) as any
  const animations = Object.keys(theme.variants.animation) as any
  const max = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']

  it.each([
    // Props
    ['with modelValue', { props: { modelValue: 50 } }],
    ['with status', { props: { modelValue: 50, status: true } }],
    ['with status inverted', { props: { modelValue: 50, status: true, inverted: true } }],
    ['with max', { props: { modelValue: 2, status: true, max } }],
    ['with max inverted', { props: { modelValue: 2, status: true, inverted: true, max } }],
    ['with as', { props: { as: 'span' } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { color } }]),
    ...orientations.map((orientation: string) => [`with orientation ${orientation}`, { props: { orientation } }]),
    ...animations.map((animation: string) => [`with animation ${animation}`, { props: { animation } }]),
    ['with class', { props: { class: 'w-48' } }],
    ['with ui', { props: { ui: { base: 'bg-white dark:bg-gray-900' } } }],
    // Slots
    ['with status slot', { slots: { status: () => 'Status slot' } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: ProgressProps, slots?: Partial<ProgressSlots> }) => {
    const html = await ComponentRender(nameOrHtml, options, Progress)
    expect(html).toMatchSnapshot()
  })
})