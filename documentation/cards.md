## Підтримувані Stripe бренди та відповідні іконки з репозиторію

| (Stripe)   | Назва іконки в @/components/icons | Початок картки (BIN)             | Довжина   | Коментар                        |
| ---------- | --------------------------------- | -------------------------------- | --------- | ------------------------------- |
| visa       | Visa                              | 4                                | 13, 16,19 | Найпоширеніша                   |
| mastercard | Mastercard                        | 51–55, 2221–2720                 | 16        | З 2017 Mastercard розширила BIN |
| amex       | AmericanExpress                   | 34, 37                           | 15        |                                 |
| discover   | Discover                          | 6011, 622126–622925, 644–649, 65 | 16-19     | США                             |
| diners     | Diners                            | 300–305, 36, 38–39               | 4         |                                 |
| jcb        | Jcb                               | 3528–3589                        |           | Японія                          |
| unionpay   | Unionpay                          | 62                               |           | Китай, підтримується частково   |
| elo        | Elo                               | 636368, 438935, ін.              |           | Stripe підтримує в Лат. Америці |
| hiper      | Hipercard                         | 606282                           |           | Stripe підтримує в Бразилії     |

## Test cards Stripe

| brand                              | number              | CVC          | Date            |
| ---------------------------------- | ------------------- | ------------ | --------------- |
| Visa                               | 4242424242424242    | Any 3 digits | Any future date |
| Visa (Debit)                       | 4000056655665556    | Any 3 digits | Any future date |
| Mastercard                         | 5555555555554444    | Any 3 digits | Any future date |
| Mastercard (2-series)              | 2223003122003222    | Any 3 digits | Any future date |
| Mastercard (Debit)                 | 5200828282828210    | Any 3 digits | Any future date |
| Mastercard (prepaid)               | 5105105105105100    | Any 3 digits | Any future date |
| American Express                   | 378282246310005     | Any 4 digits | Any future date |
| American Express                   | 371449635398431     | Any 4 digits | Any future date |
| Discover                           | 6011111111111117    | Any 3 digits | Any future date |
| Discover                           | 6011000990139424    | Any 3 digits | Any future date |
| Discover (Direct Debit)            | 6011981111111113    | Any 3 digits | Any future date |
| Diners Club                        | 3056930009020004    | Any 3 digits | Any future date |
| Diners Club (14-digit card number) | 36227206271667      | Any 3 digits | Any future date |
| BCcard and DinaCard                | 6555900000604105    | Any 3 digits | Any future date |
| JCB                                | 3566002020360505    | Any 3 digits | Any future date |
| UnionPay                           | 6200000000000005    | Any 3 digits | Any future date |
| UnionPay (Debit)                   | 6200000000000047    | Any 3 digits | Any future date |
| UnionPay (19-digit card)           | 6205500000000000004 | Any 3 digits | Any future date |
