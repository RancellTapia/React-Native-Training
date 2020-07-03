const { gql } = require('apollo-server');

const typeDefs = gql`
	type Titulo {
		titulo: String
		tecnologia: String
	}

	type Tecnologia {
		tecnologia: String
	}

	type Query {
		obtenerTitulo: [Titulo]

		obtenerTecnologia: [Tecnologia]
	}
`;

module.exports = typeDefs;
