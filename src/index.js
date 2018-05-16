const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]


let idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        feed: () => links,
        link: (root, args) =>  {
            const { id } = args;
            const index = links.findIndex((el) => el.id === id);
            if (index !== -1) {
                return links[index]
            } else {
                return null
            }
        }
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (root, args) => {
            const { id, url, description } = args;
            const index = links.findIndex((el) => el.id === id);
            if (index !== -1) {
                links[index] = Object.assign({}, { id, url, description });
                return links[index]
            } else {
                return null
            }
        },
        deleteLink: (root, args) => {
            const { id } = args;
            const index = links.findIndex((el) => el.id === id);
            if (index !== -1) {
                const output = links[index];
                links = links.filter(el => el.id !== id)
                return output;
            } else {
                return null
            }
        }
    },
    Link: {
        id: (root) => root.id,
        description: (root) => root.description,
        url: (root) => root.url
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on localhost:4000`))