## cypher-tag

A JavaScript template literal tag for Cypher in GraphQL.
## Motivation
The [neo4j-graphql-js](https://www.npmjs.com/package/neo4j-graphql-js) and [@neo4j/graphql](https://www.npmjs.com/package/@neo4j/graphql) libraries define a [@cypher](https://grandstack.io/docs/graphql-custom-logic) directive used for statically embedding Cypher statements on fields. This allows for writing custom operations that translate GraphQL to Cypher, on top of the default translation logic.

```graphql
directive @cypher(statement: String!) on FIELD_DEFINITION ...
```

But there is no syntax highlighting for Cypher within GraphQL and attempting to define a `cypher` or `cql` tag must handle for nested composition. 
## Syntax Highlighting
If you install the [Cypher Query Language Tools for Neo4j](https://marketplace.visualstudio.com/items?itemName=AnthonyJGatlin.vscode-cypher-query-language-tools) extension then syntax highlighting will be supported when using the `cql` template literal tag.

#### Not Highlighted

![Not Highlighted](https://github.com/michaeldgraham/cypher-tag/blob/main/no-highlight.png?raw=true)

When using `cql`, the tagged template literal is wrapped with a GraphQL [Block String](https://spec.graphql.org/June2018/#sec-String-Value) when compiled. Nested compilations are also supported, allowing for Cypher statements to be progressively composed and injected as a variable.

So instead of writing:

```graphql
type Type {
  field: OutputType @cypher(statement: " ... ")
}
```
Or writing: 
```graphql
type Type {
  field: OutputType @cypher(statement: """
    ...
  """)
}
```

You can write:
```graphql
type Type {
  field: OutputType @cypher(statement: ${cql`
    ... 
  `})
}
```

#### Highlighted

![Highlighted](https://github.com/michaeldgraham/cypher-tag/blob/main/highlighted.png?raw=true)

# Composition
You can use the `cql` tag to compose the Cypher of another `cql` tag. This enables composition and reuse of Cypher template variables, perhaps while using imperative tooling, making your `@cypher` directives [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

![Composition](https://github.com/michaeldgraham/cypher-tag/blob/main/composition.png?raw=true)

## Roadmap
  * Static validation of Cypher in string literals tagged with `cql`
  * Corresponding VSCode extension
    * Improved syntax highlighting
    * IntelliSense integration with GraphQL schema
    * Activity bar tab with directory navigation for only files containing `cql`