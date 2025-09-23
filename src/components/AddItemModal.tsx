import React, { useState } from 'react';
import { X, Plus, Package, Upload, Image } from 'lucide-react';
import { NewInventoryItem } from '../types/inventory';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: NewInventoryItem) => void;
  isAdding: boolean;
  preselectedCategory?: string; // <-- agregado
}

export function AddItemModal({
  isOpen,
  onClose,
  onAdd,
  isAdding,
  preselectedCategory, // <-- agregado
}: AddItemModalProps) {
  const [formData, setFormData] = useState<NewInventoryItem>({
    tipo: '',
    nombre: '',
    codigo: '',
    ubicacion: '',
    stock: 0,
    unidad: 'UNI',
    puntoPedido: 5,
    foto: '',
    categoria: preselectedCategory || '', // <-- inicializar
  });

  const [errors, setErrors] = useState<Partial<NewInventoryItem>>({});
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<NewInventoryItem> = {};

    if (!formData.tipo.trim()) {
      newErrors.tipo = 'El tipo es requerido';
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El texto breve es requerido';
    }

    if (!formData.codigo.trim()) {
      newErrors.codigo = 'El código es requerido';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }

    if (!formData.unidad.trim()) {
      newErrors.unidad = 'La unidad es requerida';
    }

    if (formData.puntoPedido < 0) {
      newErrors.puntoPedido = 'El punto de pedido no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onAdd(formData);
  };

  const handleInputChange = (field: keyof NewInventoryItem, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} /> Agregar Nuevo Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tipo
            </label>
            <input
              type="text"
              value={formData.tipo}
              onChange={(e) => handleInputChange('tipo', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.tipo && (
              <p className="text-red-500 text-sm">{errors.tipo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm">{errors.nombre}</p>
            )}
          </div>

          {/* Categoría solo si no viene preseleccionada */}
          {!preselectedCategory && (
            <div>
              <label
                htmlFor="categoria"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Categoría (Opcional)
              </label>
              <select
                id="categoria"
                value={formData.categoria || ''}
                onChange={(e) =>
                  handleInputChange('categoria', e.target.value)
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              >
                <option value="">Seleccionar categoría (opcional)</option>
                <option value="Tornillería y Fijación">🔩 Tornillería y Fijación</option>
                <option value="Transmisión">⚙️ Transmisión</option>
                <option value="Lubricantes y Fluidos">💧 Lubricantes y Fluidos</option>
                <option value="Rodamientos">⚙️ Rodamientos</option>
                <option value="Sellos y Empaques">🔒 Sellos y Empaques</option>
                <option value="Filtros">🧽 Filtros</option>
                <option value="Válvulas y Conexiones">🔗 Válvulas y Conexiones</option>
                <option value="Equipos Rotativos">🏭 Equipos Rotativos</option>
                <option value="Eléctricos">⚡ Eléctricos</option>
                <option value="Tuberías y Mangueras">🚰 Tuberías y Mangueras</option>
                <option value="Repuestos ERSA">🔴 Repuestos ERSA</option>
                <option value="Materiales UNBW">📦 Materiales UNBW</option>
                <option value="Otros">📦 Otros</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isAdding}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isAdding ? 'Agregando...' : 'Agregar Item'}
          </button>
        </form>
      </div>
    </div>
  );
}
