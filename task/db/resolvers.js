const Usuario = require('../models/Usuarios');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
const bcrypyjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

//Crea y firma JWT
const crearToken = (usuario, secreta, expiresIn) => {
	console.log(usuario);
	const { id, email } = usuario;

	return jwt.sign({ id, email }, secreta, { expiresIn });
};

const resolvers = {
	Query: {
		obtenerProyectos: async (_, {}, ctx) => {
			const proyectos = await Proyecto.find({ creador: ctx.usuario.id });

			return proyectos;
		},

		obtenerTareas: async (_, { input }, ctx) => {
			const tareas = await Tarea.find({ creador: ctx.usuario.id })
				.where('proyecto')
				.equals(input.proyecto);

			return tareas;
		},
	},

	Mutation: {
		crearUsuario: async (_, { input }) => {
			const { email, password } = input;

			const existeUsuario = await Usuario.findOne({ email });

			//Si el usuario existe
			if (existeUsuario) {
				throw new Error('El usuario ya esta registrado');
			}

			try {
				//Hashear password
				const salt = await bcrypyjs.genSalt(10);
				input.password = await bcrypyjs.hash(password, salt);

				console.log(input);

				//Registrar nuevo usuario
				const nuevoUsuario = new Usuario(input);
				console.log(nuevoUsuario);

				nuevoUsuario.save();
				return 'Usuario Creado Correctamente';
			} catch (error) {
				console.log(error);
			}
		},

		autenticarUsuario: async (_, { input }) => {
			const { email, password } = input;

			const existeUsuario = await Usuario.findOne({ email });

			//Si el usuario existe
			if (!existeUsuario) {
				throw new Error('El usuario no existe');
			}

			//Si el password es correcto
			const passwordCorrecto = await bcrypyjs.compare(
				password,
				existeUsuario.password
			);

			if (!passwordCorrecto) {
				throw new Error('Password Incorrecto');
			}

			//Dar acceso a la app
			return {
				token: crearToken(existeUsuario, process.env.SECRETA, '2hr'),
			};
		},

		nuevoProyecto: async (_, { input }, ctx) => {
			try {
				const proyecto = new Proyecto(input);

				//Asociar al creador
				proyecto.creador = ctx.usuario.id;

				//Almacena en la BD
				const resultado = await proyecto.save();

				return resultado;
			} catch (error) {
				console.log(error);
			}
		},

		actualizarProyecto: async (_, { id, input }, ctx) => {
			//Revisar si el proyecto existe o no
			let proyecto = await Proyecto.findById(id);

			if (!proyecto) {
				throw new Error('Proyecto no encontrado');
			}

			//Revisar que si la persona que trata de editarlo es el creador
			if (proyecto.creador.toString() !== ctx.usuario.id) {
				throw new Error('No tienes las credenciales para editar');
			}

			//Guardar el proyecto
			proyecto = await Proyecto.findByIdAndUpdate({ _id: id }, input, {
				new: true,
			});
			return proyecto;
		},

		eliminarProyecto: async (_, { id }, ctx) => {
			//Revisar si el proyecto existe o no
			let proyecto = await Proyecto.findById(id);

			if (!proyecto) {
				throw new Error('Proyecto no encontrado');
			}

			//Revisar que si la persona que trata de eliminar es el creador
			if (proyecto.creador.toString() !== ctx.usuario.id) {
				throw new Error('No tienes las credenciales para Eliminar');
			}

			//Eliminar
			await Proyecto.findByIdAndDelete({ _id: id });

			return 'Proyecto Eliminado';
		},

		nuevaTarea: async (_, { input }, ctx) => {
			try {
				const tarea = new Tarea(input);
				tarea.creador = ctx.usuario.id;
				const resultado = await tarea.save();

				return resultado;
			} catch (error) {
				console.log(error);
			}
		},

		actualizarTarea: async (_, { id, input, estado }, ctx) => {
			//Si la tarea existe o no
			let tarea = await Tarea.findById(id);

			if (!tarea) {
				throw new Error('Tarea no encontrado');
			}

			//Si la persona que edita es el creador
			if (tarea.creador.toString() !== ctx.usuario.id) {
				throw new Error('No tienes las credenciales para editar');
			}

			//Asignar estado
			input.estado = estado;

			//Guardar y retomar la tarea

			tarea = await Tarea.findByIdAndUpdate({ _id: id }, input, {
				new: true,
			});

			return tarea;
		},

		eliminarTarea: async (_, { id }, ctx) => {
			//Si la tarea existe o no
			let tarea = await Tarea.findById(id);

			if (!tarea) {
				throw new Error('Tarea no encontrado');
			}

			//Si la persona que elimina es el creador
			if (tarea.creador.toString() !== ctx.usuario.id) {
				throw new Error('No tienes las credenciales para editar');
			}

			//Eliminar
			await Tarea.findByIdAndDelete({ _id: id });

			return 'Tarea Eliminado';
		},
	},
};

module.exports = resolvers;
