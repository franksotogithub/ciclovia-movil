import { LoginRequest } from './login.requets';
import { prop ,required,numeric, maxLength, minLength, NumericValueType, minNumber} from '@rxweb/reactive-form-validators';

export class LoginModel implements  LoginRequest {
  
 

  @required({message:'*Se requiere el usuario'}) 
  username: string;

  @required({message:'*Se requiere el password'}) 
  password : string;

  is_valid: boolean;

  constructor(p ?: LoginRequest){   
    this.username = p?.username;
    this.password = p?.password;    
  }


}
  