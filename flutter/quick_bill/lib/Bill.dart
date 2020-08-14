class Bill {
  String description;
  int amount;

  Bill({this.description, this.amount});

  factory Bill.fromJson(Map<String, dynamic> json) {
    return Bill(
      description: json['description'],
      amount: json['amount'],
    );
  }
}
