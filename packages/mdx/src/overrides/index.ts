import { H1, H2, H3, H4, H5, H6 } from './heading'
import { Link } from './link'
import { Pre, Code } from './code'
import { Paragraph } from './paragraph'
import { UnorderedList, OrderedList } from './list'

export { H1, H2, H3, H4, H5, H6 }
export { Link }
export { Pre, Code }
export { Paragraph }
export { UnorderedList, OrderedList }

export const mdxOverrides = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  pre: Pre,
  code: Code,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
}
