const { gql } = require('apollo-server');

const typeDefs = gql`
	type Titulo {
		titulo: String
		tecnologia: String
	}

	type Tecnologia {
		tecnologia: String
	}

	type Token {
		token: String
	}

	type Proyecto {
		nombre: String
		id: ID
	}

	type Query {
		obtenerTitulo: [Titulo]

		obtenerTecnologia: [Tecnologia]
	}

	input UsuarioInput {
		nombre: String!
		email: String!
		password: String!
	}

	input AutenticarInput {
		email: String!
		password: String!
	}

	input ProyectoInput {
		nombre: String!
	}

	type Mutation {
		crearUsuario(input: UsuarioInput): String
		autenticarUsuario(input: AutenticarInput): Token
		nuevoProyecto(input: ProyectoInput): Proyecto
	}
`;

module.exports = typeDefs;
