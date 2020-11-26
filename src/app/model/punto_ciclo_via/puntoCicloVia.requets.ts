export interface PuntoCicloViaRequest {
  id_punto_ciclovia: number;
  
  ciclovia: string;
  distrito : string;
  tramo: string;
  usuario: string;
  seccion_vial_normativa: string;
  seccion_vial_actual: string;
  tipo: string;
  tipo_ancho: number;
  

  ele_seg_tipo: string;
  ele_seg_estado: string;
  ele_senial_ver_tipo: string;
  ele_senial_ver_estado: string;

  ele_senial_hor_tipo: string;
  ele_senial_hor_valor: string;
  supe_rodadura_tipo: string;
  supe_rodadura_valor: string;

  fecha: Date;
  latitud: number;
  longitud: number;
  }
  