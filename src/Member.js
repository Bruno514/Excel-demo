export default class Member {
  constructor(dateNegotiation, member, nnf, price, dateExpire, email) {
    this.dateNegotiation = dateNegotiation;
    this.member = member;
    this.nnf = nnf;
    this.price = price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    this.dateExpire = dateExpire;
    this.email = email;
  }

  get fullText() {
    const dateNegotiationFormated = this.dateNegotiation
      .toJSON()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");
    const dateExpireFormated = this.dateExpire
      .toJSON()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("/");

    const fullText = `Para: 
${this.member},
    
Informamos que ainda não identificamos o pagamento de nossa NF nº ${this.nnf}, emitida em ${dateNegotiationFormated}, no valor de ${this.price} e vencida em ${dateExpireFormated}.
Caso já tenha efetuado o pagamento, por favor desconsidere este aviso.
Se houver algum problema ou se precisar de mais informações, não hesite em nos contatar. Valorizamos a parceria com você e estamos aqui para ajudar a resolver quaisquer dúvidas que possam surgir.
    
Agradecemos pela sua atenção.
    
Atenciosamente,`;

    return fullText;
  }
}
