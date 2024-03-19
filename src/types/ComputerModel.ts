interface ComputerModel {
  id?: string | number | null;
  departamento: string;
  codigo: string;
  serie: string;
  capacidad_disco: string;
  memoria_ram: string;
  soporte_max_ram: string;
  tarjetas: number;
  slots: number;
  slots_dispositivos: number;
  slots_ocupados: number;
  user_id?: string | number | null;
  fecha_asignacion_usuario: string;
  description: string;
  estado: string;
  marca: string;
  modelo: string;
  office_version: string;
  year_lanzamiento: string;
  generacion: string;
  tipo_perfil: string;
  ghz_procesador: string;
  marca_procesador: string;
  generacion_procesador: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  deleted: boolean;
}

export default ComputerModel;
