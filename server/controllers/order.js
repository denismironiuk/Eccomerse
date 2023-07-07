const Order = require('../models/order');
const EmailSender = require('../util/EmailSender');
const easyinvoice = require('easyinvoice');
const jwt = require('jsonwebtoken');

const createOrder = async (customer, data) => {
   
  
    
      const items = JSON.parse(customer.metadata.cart)
      const newOrder = new Order({
        userId: customer.metadata.userId,
        paymentIntentId: data.paymentIntentId,
        products: items,
        subTotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        payment_status: data.payment_status
      })
      try {
        const savedOrder = await newOrder.save();
     
        const invoiceName='invoice-'+ savedOrder._id.toString() + '.pdf'
        var invoice = {
          // Customize enables you to provide your own templates
          // Please review the documentation for instructions and examples
          "customize": {
              //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
          },
          "images": {
              // The logo on top of your invoice
              "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
              // The invoice background
              "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
          },
          // Your own data
          "sender": {
              "company": "Sample Corp",
              "address": "Sample Street 123",
              "zip": "1234 AB",
              "city": "Sampletown",
              "country": "Samplecountry"
              //"custom1": "custom value 1",
              //"custom2": "custom value 2",
              //"custom3": "custom value 3"
          },
          // Your recipient
          "client": {
              "company": "Client Corp",
              "address": "Clientstreet 456",
              "zip": "4567 CD",
              "city": "Clientcity",
              "country": "Clientcountry"
              // "custom1": "custom value 1",
              // "custom2": "custom value 2",
              // "custom3": "custom value 3"
          },
          "information": {
              // Invoice number
              "number": "2021.0001",
              // Invoice data
              "date": "12-12-2021",
              // Invoice due date
              "due-date": "31-12-2021"
          },
          // The products you would like to see on your invoice
          // Total values are being calculated automatically
          products: items.map(item => ({
            "quantity": +item.quantity,
           "description": item.name,
            "tax-rate": 5,
            price: +item.price.toFixed(2)
          })),
          // The message you would like to display on the bottom of your invoice
          "bottom-notice": "Kindly pay your invoice within 15 days.",
          // Settings to customize your invoice
          "settings": {
              "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
              // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
              // "margin-top": 25, // Defaults to '25'
              // "margin-right": 25, // Defaults to '25'
              // "margin-left": 25, // Defaults to '25'
              // "margin-bottom": 25, // Defaults to '25'
              // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
              // "height": "1000px", // allowed units: mm, cm, in, px
              // "width": "500px", // allowed units: mm, cm, in, px
              // "orientation": "landscape", // portrait or landscape, defaults to portrait
          },
          // Translate your invoice to your preferred language
          "translate": {
              // "invoice": "FACTUUR",  // Default to 'INVOICE'
              // "number": "Nummer", // Defaults to 'Number'
              // "date": "Datum", // Default to 'Date'
              // "due-date": "Verloopdatum", // Defaults to 'Due Date'
              // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
              // "products": "Producten", // Defaults to 'Products'
              // "quantity": "Aantal", // Default to 'Quantity'
              // "price": "Prijs", // Defaults to 'Price'
              // "product-total": "Totaal", // Defaults to 'Total'
              // "total": "Totaal", // Defaults to 'Total'
              // "vat": "btw" // Defaults to 'vat'
          },
      };
  
         await easyinvoice.createInvoice(invoice,async(result)=>{
         if(result){
          console.log("success")
         }
         else{
          console.log("error")
         }
          const userEmail = customer.email;
          const pdfContent = result.pdf;
          const attachments = [{ 
            filename: invoiceName, 
            content: pdfContent,
            encoding:'base64',
            contentType: 'application/pdf'
          }];

          const emailContent = `<h1>Thank you for your order!</h1>`
          EmailSender.sendOrderEmail(userEmail, emailContent,attachments)

         })
       }
  
      
      catch (error) {
        console.log(error)
      }
    }

module.exports = {
  createOrder,
};
