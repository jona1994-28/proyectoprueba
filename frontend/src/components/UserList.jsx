import { useState, useEffect } from 'react';
import api from '../services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/users');
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;

    try {
      await api.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('Usuario eliminado correctamente');
    } catch (err) {
      alert('Error al eliminar usuario');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando usuarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Lista de Usuarios</h2>
      <div className="grid gap-4">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center hover:shadow-md transition">
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}