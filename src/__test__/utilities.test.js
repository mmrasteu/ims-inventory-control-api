const { slugString, isASlug } = require('../app/common/utilities');

describe('slugString', () => {
  it('Convierte un string en un slug', () => {
    expect(slugString('¡Hola, Mundo! ¿Cómo estás?')).toBe('hola-mundo-como-estas');
  });

  it('Maneja correctamente caracteres especiales', () => {
    expect(slugString('¡Esto_es@un#slug$')).toBe('esto-esunslug');
  });

  it('Maneja correctamente múltiples espacios', () => {
    expect(slugString('  Hola    Mundo   ')).toBe('hola-mundo');
  });
});

describe('isASlug', () => {
    it('Devuelve true para un slug válido', () => {
      expect(isASlug('hola-mundo')).toBe(true);
    });
  
    it('Devuelve false para un string que no es un slug', () => {
      expect(isASlug('esto-no_es_un_slug')).toBe(false);
    });
  
    it('Devuelve false para un string que contiene caracteres no permitidos', () => {
      expect(isASlug('!hola-mundo')).toBe(false);
    });
  
    it('Devuelve false para un string vacío', () => {
      expect(isASlug('')).toBe(false);
    });
  
    it('Devuelve false para un string que termina con guión', () => {
      expect(isASlug('hola-mundo-')).toBe(false);
    });
  
    it('Devuelve false para un string que comienza con guión', () => {
      expect(isASlug('-hola-mundo')).toBe(false);
    });
  });
