import { PuntoCicloViaRequest } from './puntoCicloVia.requets';

export class PuntoCicloViaModel implements  PuntoCicloViaRequest {
  id_punto_ciclovia: number;
  
  ciclovia: string;
  distrito : string;
  tramo: string;
  usuario: string;
  seccion_vial_normativa: string;
  seccion_vial_actual: string;
  tipo: string;
  ancho: number;

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
  tipo_ancho: number;

  constructor(p ?: PuntoCicloViaRequest){
    this.id_punto_ciclovia = p?.id_punto_ciclovia;
    this.ciclovia = p?.ciclovia;
    this.distrito = p?.distrito;
    this.tramo = p?.tramo;
    this.usuario = p?.usuario;
    this.seccion_vial_normativa = p?.seccion_vial_normativa;
    this.seccion_vial_actual = p?.seccion_vial_actual;
    this.tipo = p?.tipo;
    this.tipo_ancho = p?.tipo_ancho;
    this.ancho = p?.ancho;
    this.ele_seg_tipo = p?.ele_seg_tipo;
    this.ele_seg_estado = p?.ele_seg_estado;
    this.ele_senial_ver_tipo = p?.ele_senial_ver_tipo;
    this.ele_senial_ver_estado = p?.ele_senial_ver_estado;
    this.ele_senial_hor_tipo = p?.ele_senial_hor_tipo;
    this.ele_senial_hor_valor = p?.ele_senial_hor_valor;
    this.supe_rodadura_tipo = p?.supe_rodadura_tipo;
    this.supe_rodadura_valor = p?.supe_rodadura_valor;
    this.fecha = p?.fecha;
    this.latitud = p?.latitud;
    this.longitud = p?.longitud;
   
  }




  }
  