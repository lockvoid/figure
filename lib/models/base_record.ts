export class BaseRecord {
  $value: any;

  constructor(public $snapshot: FirebaseDataSnapshot) {
    let value = this.$snapshot.val();

    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      this.$value = value;
    } else {
      Object.keys(value).forEach(key => this[key] = value[key]);
    }
  }

  get $ref(): Firebase {
    return this.$snapshot.ref();
  }

  get $key(): string {
    return this.$snapshot.key();
  }
}
