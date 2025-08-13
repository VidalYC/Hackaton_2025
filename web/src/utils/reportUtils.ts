export const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'text-green-600 bg-green-100';
    case 'processing': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'available': return 'Disponible';
    case 'processing': return 'Procesando';
    default: return 'No disponible';
  }
};
