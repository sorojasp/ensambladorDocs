export default class DocDefinition {

  public doc: object;
  variablesPdf: any;

  constructor(variablesPdf: any) {
    this.variablesPdf = variablesPdf;

    this.doc = {
      pageMargins: [40, 60, 40, 60],
      pageOrientation: 'portrait',
      pageSize: 'A4',
      content: [

        {
          text: [
            `PAZ Y SALVO POR EL CONTRATO DE CESIÓN DE CRÉDITOS SOBRE UNA SENTENCIA/CONCILIACIÓN JUDICIAL `,
            '\n\n',

            { text: `${variablesPdf.nombre_apellido}`, bold: true },

            `, identificado/a/s con la cédula de ciudadanía N°`,
            { text: `${variablesPdf.cedula}`, bold: true },
            ` de `,
            { text: `${variablesPdf.ciudad}`, bold: true },
            ` , y portador/a/es de la tarjeta profesional N°`,
            { text: `${variablesPdf.tarjeta_p}`, bold: true },
            `del Consejo Superior de la Judicatura, actuando en calidad de APODERADO/A/S y por tanto en nombre y representación del/las/los señor/e/a/s:`,  //HASTA AQUIÍ
            { text: `${variablesPdf.ciudadAccionado}`, fontSize: 15, bold: true },
            `, para que mediante el tramite propio del proceso ordinario laboral de mínima cuantía y mediante sentencia se profieran las respectivas condenas que más adelante entrare a solicitar, para lo cual me fundamento en los hechos y normas que a continuación relaciono.`,

          ], alignment: 'justify'
        }/*,
        { text: `\n\nTipo de proceso`, alignment: 'center', bold: true },
        {
          text: `\n\nEn razón de la cuantía siendo esta inferior a veinte (20) SMLMV, corresponde la presente acción a la descrita como ordinaria laboral de única instancia.`,
          alignment: 'justify'
        },
        { text: `\n\n\nHechos`, alignment: 'center', bold: true },
        {
          text: `\n1. ${variablesPdf.fechaDeIngresoALaEmpresa}`, alignment: 'left'
        },
        {
          text: `\n2. ${variablesPdf.salarioPactado}`, alignment: 'left'
        },
        {
          text: `\n3. El trabajo lo realice de manera personal, obedeciendo las instrucciones del patrono y cumpliendo con el horario de trabajo por él establecido, sin que jamás hubiera queja por mal comportamiento suscitado por mí parte.`, alignment: 'justify'
        },
        { 
          text: [
            {
              text: `\n4. Durante el periodo nombrado arriba me desempeñe `
            },
            {
              text: `${variablesPdf.funcionesQueRealizaba}`, bold: true
            },
            {
              text: `.`
            }
          ], alignment: 'left'
        },
        {
          text: `\n5. ${variablesPdf.conflictos}`, alignment: 'left'
        },
        {
          text: `\n6. ${variablesPdf.conflictos}`, alignment: 'left'
        },
        {
          text: `\n7. ${variablesPdf.conflictos}`, alignment: 'left'
        },
        {
          text: `\n8. ${variablesPdf.incumplimientoDelEmpleador}`, alignment: 'left'
        },
        {
          text: `\n9. ${variablesPdf.fechaDeLaPrimeraSolicitudAlEmpleador}`, alignment: 'left'
        },
        {
          text: `\n10. ${variablesPdf.situacionActualFrenteALaRenunciaDelEmpleador}`, alignment: 'left'
        },
        { text: `\n\n\nPeticiones`, alignment: 'center', bold: true },
        {
          text: `\nSolicito al señor juez que una vez probados los hechos arriba enunciados se declare:    `,
          alignment: 'justify'
        },
        {
          text: [
            {
              text: `\n1.	Que entre el señor` + ' ',
              alignment: 'justify'
            },
            {
              text: `${variablesPdf.accionante}` + ' ', bold: true
            },
            {
              text: `y la empresa`
            },
            {
              text: ` ${variablesPdf.accionado}` + '  ', bold: true
            },
            {
              text: `existió contrato de trabajo, el cual terminó por`
            },
            {
              text: ' ' + 'CAUSA', bold: true
            }


          ]
        },

        {
          text: [
            {
              text: `\n2.	Que la` + ' ',
              alignment: 'justify'
            },
            {
              text: `${variablesPdf.accionado}` + ' ', bold: true
            },
            {
              text: `aquí demandada, me debe pagar la cantidad`
            },
            {
              text: ` ${variablesPdf.salariosVencidos}` + '  ', bold: true
            },
            {
              text: `por concepto de salarios atrasados.`
            }


          ]
        },

        {
          text: [
            {
              text: `\n3. Que la` + ' ',
              alignment: 'justify'
            },
            {
              text: `${variablesPdf.accionado}` + ' ', bold: true
            },
            {
              text: `aquí demandada, me debe pagar la cantidad de`
            },
            {
              text: ` ${variablesPdf.cesantias}` + '  ', bold: true
            },
            {
              text: `por concepto de cesantías correspondientes a`
            },
            {
              text: ` ${variablesPdf.diasDeTrabajo}` + ' ', bold: true
            },
            {
              text: ` días de trabajo.`
            }
          ]
        },

        {
          text: [
            {
              text: `\n4. Que la demandada debe pagar al demandante la cantidad de`
            },
            {
              text: ` ${variablesPdf.interesesDeCesantias}`, bold: true
            },
            {
              text: ` pesos, por concepto de intereses de cesantías.`
            },
          ], alignment: 'justify'
        },

        {
          text: [
            {
              text: `\n5. Que la`
            },
            {
              text: ` ${variablesPdf.accionado}`, bold: true
            },
            {
              text: ` me debe pagar, por concepto de vacaciones por la fracción de tiempo de`
            },
            {
              text: ` ${variablesPdf.diasDeTrabajo}`, bold: true
            },
            {
              text: ` días laborados, la suma de`
            },
            {
              text: ` ${'VACACIONES'}`, bold: true
            },
            {
              text: ` pesos.`
            },
            
          ], alignment: 'justify'
        },
       
        

        {
          text: [
            {
              text: `\n6.	Que la demandada me debe pagar por primas de servicio la suma de`
            },
            {
              text: ` ${variablesPdf.primaDeServicios}`,
            },
            {
              text: ` pesos.`,
            }
          ], alignment: 'justify'
        },

        {
          text: [
            {
              text: `\n7. Que tengo derecho a recibir de la demandada la suma correspondiente a`
            },
            {
              text: ` ${variablesPdf.indemnizacionPorNoPago}`,
            },
            {
              text: ` por no pago pesos, por concepto de la indemnización por no pago de salarios y liquidación contempladas en el artículo 65 CST modificado por el artículo 29 de la ley 789 de 2002, correspondiente a un día de salario por cada uno que se demore en el pago o consignación de las deudas laborales.`,
            }
          ], alignment: 'justify'
        },
        

        {
          text: `\n8. Que sean pagados los valores que continúen en causación hasta el día que se configure el pago.`,
          alignment: 'justify'
        },
        {
          text: `\n9. Todo lo que usted señor Juez considere ultra-petita o extra-petita en el presente proceso.`,
          alignment: 'justify'
        },
        {
          text: `\n10. Que la demandada debe pagar las costas del proceso.`,
          alignment: 'justify'
        },
        // { text: `\n\n\nPruebas`, alignment: 'center', bold: true },
        // {
        //   text: `\nSolicito al señor Juez que se sirva decretar y practicar las siguientes pruebas para que sean tenidas en cuenta al elaborarse el fallo respectivo:`,
        //   alignment: 'justify'
        // },
        // {
        //   text: `\n1.	Documentales:`,
        //   alignment: 'justify'
        // },
        // {
        //   text: `\na.	.`
        // },
        // {
        //   text: `\nb.	.`,
        //   alignment: 'justify'
        // },
        // {
        //   text: `\nc.	.`,
        //   alignment: 'justify'
        // },
        { text: `\n\n\nCompetencia`, alignment: 'center', bold: true },
        {
          text: `\nEs usted competente ya que yo legitimado por activa preste mis servicios en esta ciudad en la cual está domiciliado al igual que la legitimada por pasiva, además, lo es por la naturaleza del negocio y la razón de la cuantía.`,
          alignment: 'justify'
        },
        { text: `\n\n\nCuantía`, alignment: 'center', bold: true },
        { 
          text: [
            { 
              text: `\nLa estimo en cantidad a la fecha correspondiente a`
            },
            {
              text: ` ${variablesPdf.cuantia}`, bold: true
            },
            { 
              text: `, la cual corresponde a una mínima cuantía, siendo este valor inferior a 20 salarios mínimos legales mensuales vigentes.`
            },

          ],alignment: 'justify'
          
        },

        { text: `\n\n\nNotificaciones`, alignment: 'center', bold: true },
        {
          text: `\nPara que se efectúen debidamente facilito las siguientes direcciones:`,
          alignment: 'justify'
        },

        { text: `\nDEMANDADO`, bold: true },
        { 
          text: [
            {
              text: `\n${variablesPdf.accionado}`, bold: true
            },
            {
              text: `, puede ser notificado en `
            },
            {
              text: `${variablesPdf.direccionDeNotificacionAccionado}`, bold: true
            },
            {
              text: `, de la ciudad de`
            },
            {
              text: `${variablesPdf.ciudadAccionado}`, bold: true
            },
            { 
              text: `\nEmail:`
            },
            { 
              text: ` ${variablesPdf.correoAccionado}`, bold: true 
            },
          ], alignment: 'justify'
        },
        

        { text: `\nDEMANDANTE`, bold: true },
        { 
          text: [
            {
              text: `\n${variablesPdf.accionante}`, bold: true
            },
            {
              text: ` en calidad demandante en la secretaria de su despacho o en mi residencia en`
            },
            {
              text: `${variablesPdf.direccionDeNotificacionAccionante}`, bold: true
            },
            {
              text: ` de esta ciudad.`
            },
            { 
              text: `\nEmail:`
            },
            { 
              text: ` ${variablesPdf.correoAccionante}`, bold: true 
            },
          ], alignment: 'justify'
        },

        
        { text: `\n\n\nAnexos de la demanda`, alignment: 'center', bold: true },
        {
          text: `\n1.	Una copia de la demanda junto a sus anexos para efecto del traslado.`,
          alignment: 'justify'
        },
        {
          text: `\n2.	Una copia de la demanda sin anexos para efecto de archivo.`,
          alignment: 'justify'
        },
        {
          text: `\n3.	Los documentos aducidos como pruebas que se encontraban en mí poder.`,
          alignment: 'justify'
        },
        {
          text: `\n4.	CD con copia de la demanda y sus anexos en formato digital.`,
          alignment: 'justify'
        },
        { text: `\n\nDel Señor Juez,` },
        { text: `\n_____________________`, bold: true },
        { text: `${variablesPdf.accionante}`, bold: true },
        
        { 
          text: [
            { text: `C.C.:`},
            { text: ` ${variablesPdf.cedulaAccionante}`, bold: true },
            { text: ` de`},
            { text: ` ${variablesPdf.ciudadAccionante}`, bold: true },
          ]
        },
        { 
          text: [
            { text: `Email:`},
            { text: ` ${variablesPdf.correoAccionante}`, bold: true },
          ]
        },*/
      ]
    };


  }

  get getDoc() {

    return this.doc;

  }


  get getAbogado() {

    return this.variablesPdf;

  }






}