export class Feature {
  #id: string

  #name: string

  #isEnabled: boolean

  constructor(id: string, name: string, isEnabled: boolean) {
    this.#id = id
    this.#name = name
    this.#isEnabled = isEnabled
  }

  get id(): string {
    return this.#id
  }

  get name(): string {
    return this.#name
  }

  get isEnabled(): boolean {
    return this.#isEnabled
  }

  set isEnabled(isEnabled: boolean) {
    this.#isEnabled = isEnabled
  }
}
