export default class Cryto {
  data: {
    time: {
      updated: Date,
      updatedISO: Date,
      updateduk: Date
    }
    disclaimer: string
    bpi: {
      USD: {
        code: string,
        rate: string,
        description: string,
        rate_float: number
      },
      BTC: {
        code: string,
        rate: string,
        description: string,
        rate_float: number
      }
    }
  }
}
