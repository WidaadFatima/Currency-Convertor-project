import inquirer from "inquirer"

async function currencyConverter() {
    let currency = {
        USD: 1,
        INR: 84,
        PKR: 278
    }

    try {
        let answer = await inquirer.prompt([
            {
                name: "from",
                message: "Select the from currency:",
                type: "list",
                choices: ["USD", "INR", "PKR"]
            },
            {
                name: "to",
                message: "Select the to currency:",
                type: "list",
                choices: ["USD", "INR", "PKR"]
            },
            {
                name: "amount",
                message: "Enter the amount:",
                type: "number",
                validate: (value: number) => {
                    if (isNaN(value) || value <= 0) {
                        return "Please enter a valid number greater than zero."
                    }
                    return true
                }
            }
        ])

        let fromAmount = currency[answer.from as keyof typeof currency]
        let toAmount = currency[answer.to as keyof typeof currency]
        let amount = answer.amount as number

        if (answer.from === answer.to) {
            console.log(`The selected currencies are the same. Converted amount: ${amount}`)
            return
        }

        let baseAmount = amount / fromAmount
        let convertedAmount = baseAmount * toAmount

        console.log(`Converted amount from ${answer.from} to ${answer.to}: ${convertedAmount}`)
    } catch (error) {
        console.error("An error occurred during the currency conversion:", error)
    }
}

currencyConverter()
