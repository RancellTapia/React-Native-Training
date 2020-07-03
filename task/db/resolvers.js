const cursos = [
	{
		titulo: 'titulo 1',
		tecnologia: 'tecnologia 1',
	},
	{
		titulo: 'titulo 2',
		tecnologia: 'tecnologia 2',
	},
	{
		titulo: 'titulo 3',
		tecnologia: 'tecnologia 3',
	},
];

const resolvers = {
	Query: {
		obtenerTitulo: () => cursos,
		obtenerTecnologia: () => cursos,
	},
};

module.exports = resolvers;
