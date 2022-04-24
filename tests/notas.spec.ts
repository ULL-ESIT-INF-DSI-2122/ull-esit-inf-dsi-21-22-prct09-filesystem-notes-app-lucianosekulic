import * as fs from 'fs';
import 'mocha';
import {expect} from 'chai';
import {Notas} from '../src/notas';
import {colores} from '../src/notas';

const notas = Notas.getNotas();

describe('Practica 8: Tests', () => {
  it('Se puede instanciar un objeto Notas', () => {
    expect(notas).not.to.be.deep.equal(null);
  });

  it('El metodo getNotas() devuelve un objeto Notas', () => {
    expect(Notas.getNotas()).to.be.deep.equal(notas);
  });

  it('El metodo anadirNota() realiza un funcionamiento correcto en cualquier caso', () => {
    expect(notas.anadirNota('Pedro', 'prueba1', 'esta es la prueba 1', colores.amarillo)).to.be.deep.equal('Nota anadida');
    expect(notas.anadirNota('Pedro', 'prueba2', 'esta es la prueba 2', colores.rojo)).to.be.deep.equal('Nota anadida');
    expect(notas.anadirNota('Juan', 'prueba2', 'esta es la prueba 2', colores.verde)).to.be.deep.equal('Nota anadida');
    expect(notas.anadirNota('Juan', 'prueba2', 'esta es la prueba 2', colores.azul)).to.be.deep.equal('Existe una nota con dicho nombre');
  });

  it('El metodo leerNotas() realiza un funcionamiento correcto en cualquier caso', () => {
    const contenidoPrueba1: string = 'prueba1\n\nesta es la prueba 1'
    expect(notas.leerNota('Pedro', 'prueba1')).to.be.deep.equal(contenidoPrueba1);
    expect(notas.leerNota('inventado', 'inventado1')).to.be.deep.equal("Nota no encontrada");
  });

  it('El metodo modificarNota() realiza un funcionamiento correcto en cualquier caso', () => {
    expect(notas.modificarNota('prueba4', 'prueba4', 'no debe existir', colores.verde)).to.be.deep.equal('Usuario no encontrado');
    expect(notas.modificarNota('Juan', 'prueba4', 'no debe existir', colores.verde)).to.be.deep.equal('No existe ninguna nota con ese nombre');
    expect(notas.modificarNota('Juan', 'prueba2', 'mejorando la prueba 2', colores.azul)).to.be.deep.equal('La nota se ha sobrescrito');
  });

  it('El metodo listarNotas() realiza un funcionamiento correcto en cualquier caso', () => {
    expect(notas.listarNotas('Pedro')).to.be.deep.equal("prueba1" + "\n" + "prueba2" + "\n");
    expect(notas.listarNotas('inventado')).to.be.deep.equal("Usuario no encontrado");
  });

  it('El metodo eliminarNota() realiza un funcionamiento correcto en cualquier caso que se pueda dar', () => {
    expect(notas.eliminarNota('Pedro', 'prueba2')).to.be.deep.equal("Nota eliminada con exito");
    expect(notas.eliminarNota('Juan', 'prueba8')).to.be.deep.equal("Nota no eliminada, posible error en la ruta o en el nombre");
    expect(notas.eliminarNota('inventado', 'prueba8')).to.be.deep.equal("Nota no eliminada, posible error en la ruta o en el nombre");
  });



});

fs.rmdirSync('./ficheros', {recursive: true});