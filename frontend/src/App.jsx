import UserList from './components/UserList';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          🚀 Práctica: Vercel + Render + Axios
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Frontend en Vercel • Backend en Render • pnpm como gestor de paquetes
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <UserList />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ContactForm />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💡 Tecnologías Usadas
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="font-bold text-blue-800">React + Vite</p>
              <p className="text-sm text-gray-600">Frontend</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="font-bold text-green-800">Express</p>
              <p className="text-sm text-gray-600">Backend</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="font-bold text-purple-800">Axios</p>
              <p className="text-sm text-gray-600">HTTP Client</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="font-bold text-orange-800">pnpm</p>
              <p className="text-sm text-gray-600">Package Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;