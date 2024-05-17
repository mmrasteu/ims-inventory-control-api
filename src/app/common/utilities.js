function slugString(str) {
    // Eliminar espacios en blanco al principio y al final
    str = str.replace(/^\s+|\s+$/g, '');
  
    // Convertir a minúsculas y reemplazar vocales con acento
    str = str.toLowerCase()
             .replace(/[áäàâ]/g, 'a')
             .replace(/[éëèê]/g, 'e')
             .replace(/[íïìî]/g, 'i')
             .replace(/[óöòô]/g, 'o')
             .replace(/[úüùû]/g, 'u')
             .replace(/_/g, '-'); // Cambiar guiones bajos por guiones
  
    // Eliminar caracteres especiales excepto letras, números, espacios y guiones
    str = str.replace(/[^\w\s-]/g, '');
  
    // Reemplazar espacios por guiones y eliminar múltiples guiones consecutivos
    str = str.replace(/\s+/g, '-')
             .replace(/-+/g, '-');
  
    return str;
  }

  function isASlug(str) {
    // Expresión regular para verificar si el string es un slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  
    // Comprobar si el string coincide con la expresión regular
    return slugRegex.test(str);
  }
  
  module.exports = {
    slugString,
    isASlug
  };
  