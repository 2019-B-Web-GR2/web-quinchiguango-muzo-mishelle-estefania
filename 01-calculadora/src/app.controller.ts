import {Controller, Get, HttpCode, Headers, Body, Post, Put, Delete, Query, Response} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  private valorI = 100;

  @Get('/suma')
  @HttpCode(200)
  suma(@Headers() headers, @Response() response) {
    if (headers.numero1 && headers.numero2) {
      const numero1 = Number(headers.numero1);
      const numero2 = Number(headers.numero2);
      const totalSuma = numero1 + numero2;
      const valorS = this.valorI - totalSuma;
      this.valorI = valorS;

      if (this.valorI <= 0) {

        this.valorI = 100;
        response.set('ResultSuma', totalSuma);
        return response.send(
          {'Resultado de la suma' : totalSuma , 'Valor VariableActual' : valorS , 'Mensaje: Se ha reiniciado la variable' : valorS } );
      } else {
        response.set('ResultSuma', totalSuma);
        return response.send(
          {'Resultado de la suma' : totalSuma , 'Valor VariableActual' : valorS  });
      }

    } else {
      return response.status(200)
        .send({mensaje: 'Error, no envia parametros para la suma', error: 200});
    }
  }

  @Post('/resta')
  @HttpCode(201)
  resta(@Body() body, @Response() response) {
    if (body.numero1 && body.numero2) {
      const numero1 = Number(body.numero1);
      const numero2 = Number(body.numero2);
      const totalResta = numero1 - numero2;
      const variableS = this.valorI - totalResta;
      this.valorI = variableS;

      if (this.valorI <= 0) {

        this.valorI = 100;
        response.set('ResultSuma', totalResta);
        return response.send(
          {'Resultado de la resta' : totalResta , 'Valor VariableActual' : variableS , 'Mensaje: Se ha reiniciado la variable' : variableS } );
      } else {
        response.set('ResultSuma', totalResta);
        return response.send(
          {'Resultado de la resta' : totalResta , 'Valor VariableActual' : variableS  });
      }
    } else {
      return response.status(400)
        .send({mensaje: 'Error, no envia parametros para la resta', error: 201});
    }
  }

  @Put('/multiplicacion')
  @HttpCode(202)
  multiplicacion(@Query() query, @Response() response) {
    if (query.numero1 && query.numero2) {
      const numero1 = Number(query.numero1);
      const numero2 = Number(query.numero2);
      const totalMultip = numero1 * numero2;

      const variableS = this.valorI - totalMultip;
      this.valorI = variableS;

      if (this.valorI <= 0) {

        this.valorI = 100;
        response.set('ResultSuma', totalMultip);
        return response.send(
          {'Resultado de la multiplicacion' : totalMultip , 'Valor VariableActual' : variableS , 'Mensaje: Se ha reiniciado la variable' : variableS } );
      } else {
        response.set('ResultSuma', totalMultip);
        return response.send(
          {'Resultado de la multiplicacion' : totalMultip , 'Valor VariableActual' : variableS  });
      }

      response.set('totalMultip', totalMultip);
      return response.send({'Resultado de la Multiplicacion' : totalMultip});
    } else {
      return response.status(400)
        .send({mensaje: 'Error, no envia parametros para la Multiplicacion', error: 202});
    }
  }
  @Delete('/divisionQ')
  @HttpCode(203)
  division(@Query() query, @Response() response) {
    if (query.numero1 && query.numero2) {
      const numero1 = Number(query.numero1);
      const numero2 = Number(query.numero2);
      const totalDivision = numero1 / numero2;

      const variableS = this.valorI - totalDivision;
      this.valorI = variableS;

      if (this.valorI <= 0) {

        this.valorI = 100;
        response.set('ResultSuma', totalDivision);
        return response.send(
          {'Resultado de la division' : totalDivision , 'Valor VariableActual' : variableS , 'Mensaje: Se ha reiniciado la variable' : variableS } );
      } else {
        response.set('ResultSuma', totalDivision);
        return response.send(
          {'Resultado de la division' : totalDivision , 'Valor VariableActual' : variableS  });
      }

    } else {
      return response.status(400)
        .send({mensaje: 'Error, no envia parametros para la Division', error: 203});
    }
  }

  @Delete('/divisionB')
  @HttpCode(203)
  divisionB(@Body() body, @Response() response) {
    if (body.numero1 && body.numero2){
      const numero1 = Number(body.numero1);
      const numero2 = Number(body.numero2);
      if (numero2!=0) {
        const totalDivision = numero1 / numero2;
        response.set('totalDivision', totalDivision);
        return response.send({'Resultado de la Division' : totalDivision});
      } else {
        return response.send('No existe Division para 0');
      }

    } else {
      return response.status(400)
        .send({mensaje: 'Error, no envia parametros para la Division', error: 203});
    }
  }
}