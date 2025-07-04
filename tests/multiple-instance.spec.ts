import { test, expect } from './mind-elixir-test'
import type MindElixir from '../src/index'

declare let window: {
  E: typeof MindElixir.E
}

const data1 = {
  nodeData: {
    id: 'data1',
    topic: 'new topic',
    children: [],
  },
}

const data2 = {
  nodeData: {
    id: 'data2',
    topic: 'new topic',
    children: [
      {
        id: 'child',
        topic: 'child',
        direction: 0 as 0 | 1 | undefined,
      },
    ],
  },
}
test.beforeEach(async ({ me, page }) => {
  await me.init(data1, '#map')
  await me.init(data2, '#map2')
})

// fix: https://github.com/SSShooter/mind-elixir-core/issues/247
test('Add Child To Data2 Correctly', async ({ page, me }) => {
  const handle = await me.getInstance('#map2')
  handle.evaluateHandle(mei =>
    mei.addChild(window.E('data2', document.body), {
      id: 'child2',
      topic: 'child2',
    })
  )
  handle.evaluateHandle(mei =>
    mei.addChild(window.E('child', document.body), {
      id: 'child3',
      topic: 'child3',
    })
  )
  expect(await page.screenshot()).toMatchSnapshot()
})
