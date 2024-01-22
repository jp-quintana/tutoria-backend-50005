export const validateAddProduct = (body) => {
  const obligatoryProperties = [
    'title',
    'description',
    'price',
    'thumbnail',
    'code',
    'stock',
    'category',
  ];

  for (const property of obligatoryProperties) {
    if (!(property in body)) {
      console.log(property);
      return property;
    }
  }

  return null;
};

export const validateEditProduct = (body) => {
  const validatedProperties = body;

  const allowedProperties = [
    'title',
    'description',
    'price',
    'thumbnail',
    'code',
    'stock',
    'category',
  ];

  for (const key in validatedProperties) {
    if (!allowedProperties.includes(key)) {
      delete validatedProperties[key];
    }
  }

  return validatedProperties;
};
