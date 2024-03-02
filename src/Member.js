export default class Member {
  constructor(dateNegotiation, member, nnf, price, dateExpire, email) {
    this.dateNegotiation = dateNegotiation;
    this.member = member;
    this.nnf = nnf;
    this.price = price;
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

    const fullText = `Olá, ${this.member}, verificamos que o pagamento do boleto da NF ${this.nnf},
com emissão em ${dateNegotiationFormated}, no valor de R$ ${this.price}, com vencimento em ${dateExpireFormated},
ainda não foi efetuado. Caso seja necessária uma segunda via ou esclarecimento de dúvidas,
entre em contato conosco, estamos à disposição, ou caso já tenha pago o boleto, queira desconsiderar este aviso.`;

    return fullText.replace(/\n/g, " ");
  }
}
