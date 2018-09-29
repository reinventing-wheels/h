import { Component, React, render } from '.'

describe('h', () => {
  const unsafe = '<>&"'
  const safe = '&#60;&#62;&#38;&#34;'

  it('should insert raw html', () => {
    const vdom = <p html={unsafe} />
    const html = `<p>${unsafe}</p>`
    expect(render(vdom)).toBe(html)
  })

  it('should escape unsafe input', () => {
    const vdom = <p id={unsafe}>{unsafe}</p>
    const html = `<p id="${safe}">${safe}</p>`
    expect(render(vdom)).toBe(html)
  })

  it('should support nesting', () => {
    expect(render(<p></p>)).toBe('<p></p>')
    expect(render(<p>foo</p>)).toBe('<p>foo</p>')
    expect(render(<p>{''}</p>)).toBe('<p></p>')
    expect(render(<p>{'foo'}</p>)).toBe('<p>foo</p>')
    expect(render(<p>{['f', ['o', ['o']]]}</p>)).toBe('<p>foo</p>')
    expect(render(<p>{0}</p>)).toBe('<p>0</p>')
    expect(render(<p>{1}</p>)).toBe('<p>1</p>')
    expect(render(<p>{null}</p>)).toBe('<p></p>')
    expect(render(<p>{undefined}</p>)).toBe('<p></p>')
    expect(render(<p>{true}</p>)).toBe('<p></p>')
    expect(render(<p>{false}</p>)).toBe('<p></p>')
  })

  it('should support attributes', () => {
    expect(render(<input value='' />)).toBe('<input value>')
    expect(render(<input value='foo' />)).toBe('<input value="foo">')
    expect(render(<input value={0} />)).toBe('<input value="0">')
    expect(render(<input value={1} />)).toBe('<input value="1">')
    expect(render(<input value={null} />)).toBe('<input>')
    expect(render(<input value={undefined} />)).toBe('<input>')
    expect(render(<input disabled />)).toBe('<input disabled>')
    expect(render(<input disabled={true} />)).toBe('<input disabled>')
    expect(render(<input disabled={false} />)).toBe('<input>')
  })

  it('should support fragments', () => {
    expect(render(<></>)).toBe('')
    expect(render(<>foo</>)).toBe('foo')
    expect(render(<>foo<br/>bar</>)).toBe('foo<br>bar')
    expect(render(<><br/><br/></>)).toBe('<br><br>')
  })

  it('should support components', () => {
    const Head: Component<{ title: string }> = props => <>
      <title>{ props.title }</title>
    </>

    const Body: Component<{ title: string, content: string }> = props => <>
      <h1>{ props.title }</h1>
      <p>{ props.content }</p>
    </>

    const Page: Component<{ title: string, content: string }> = props => <>
      <Head { ...props } />
      <Body { ...props } />
    </>

    const vdom = <Page title='foo' content='bar' />
    const html = '<title>foo</title><h1>foo</h1><p>bar</p>'
    expect(render(vdom)).toBe(html)
  })
})
