'use strict';

const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const curso = document.querySelector('#curso');
const acepto = document.querySelector('#acepto');

const mostrarError = (campo, mensaje) => {
  const salida = document.querySelector(`#error-${campo.id}`);
  if (salida) salida.textContent = mensaje;
  campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
};

function validarNombre() {
  const valor = nombre.value.trim();
  let mensaje = '';
  if (valor.length < 3) mensaje = 'Escribe al menos 3 caracteres.';
  else if (valor.length > 60) mensaje = 'El nombre no puede superar 60 caracteres.';
  else if (!/[\p{L}]/u.test(valor)) mensaje = 'Incluye letras en el nombre.';
  mostrarError(nombre, mensaje);
  return !mensaje;
}

function validarCorreo() {
  const valor = correo.value.trim();
  let mensaje = '';
  if (!valor) mensaje = 'Ingresa tu correo electrónico.';
  else if (valor.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) mensaje = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
  mostrarError(correo, mensaje);
  return !mensaje;
}

function validarCurso() {
  const mensaje = curso.value ? '' : 'Selecciona el curso que te interesa.';
  mostrarError(curso, mensaje);
  return !mensaje;
}

function validarAceptacion() {
  const salida = document.querySelector('#error-acepto');
  salida.textContent = acepto.checked ? '' : 'Debes confirmar que los datos son correctos.';
  acepto.setAttribute('aria-invalid', acepto.checked ? 'false' : 'true');
  return acepto.checked;
}

nombre.addEventListener('blur', validarNombre);
correo.addEventListener('blur', validarCorreo);
curso.addEventListener('change', validarCurso);
acepto.addEventListener('change', validarAceptacion);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  resultado.textContent = '';
  resultado.classList.remove('error-general');
  const valido = [validarNombre(), validarCorreo(), validarCurso(), validarAceptacion()].every(Boolean);
  if (!valido) {
    resultado.textContent = 'Revisa los campos señalados antes de continuar.';
    resultado.classList.add('error-general');
    const primerError = formulario.querySelector('[aria-invalid="true"]');
    if (primerError) primerError.focus();
    return;
  }
  resultado.textContent = `¡Gracias, ${nombre.value.trim()}! Tu solicitud de información sobre ${curso.value} se validó correctamente en esta demostración. No se enviaron datos a un servidor.`;
});

formulario.addEventListener('reset', () => {
  window.setTimeout(() => {
    formulario.querySelectorAll('[aria-invalid]').forEach((campo) => campo.setAttribute('aria-invalid', 'false'));
    formulario.querySelectorAll('.error').forEach((campo) => { campo.textContent = ''; });
    resultado.textContent = '';
    resultado.classList.remove('error-general');
  }, 0);
});

document.querySelectorAll('[data-curso]').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    curso.value = enlace.dataset.curso;
    validarCurso();
  });
});
