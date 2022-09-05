import smtplib
from email.message import EmailMessage
from config import settings

EMAIL_ADDRESS = settings.email_address
EMAIL_PASSWORD = settings.email_password


def send_email(email, subject, message, full_name):
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg.set_content('')
        msg.add_alternative("""
                            Email from """ + email + """
                            My name is """ + full_name + """
                            """ + subject + """
                            """ + message + """
                            """)
        smtp.send_message(msg)


def reset_password_email(email, name, hash):
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        msg = EmailMessage()
        msg['Subject'] = 'Password Reset Instructions'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg.set_content("""
                        Hello """ + name + """
                        Copy the url below into your browser to reset your password
                        https://localhost:3000/resetPassword?hash=""" + hash + """
                        """)
        msg.add_alternative("""
                            <head>
                            <style>
                                .body{
                                    background-color: #eee;
                                    padding:80px;
                                }
                                .btn-blue {
                                    border: 0px;
                                    background-color: #19B5FE;
                                    color: white;
                                    border-radius: 5px;
                                    width: 100%;
                                    padding: 20px;
                                    font-weight: bold;
                                    cursor: pointer;
                                }
                                .text-center{
                                    text-align: center;
                                }
                                .card{
                                    background-color: white;
                                    border-radius: 5px;
                                    padding: 30px 70px;
                                    width: 390px;
                                    margin-left: auto;
                                    margin-right: auto;
                                }
                                .footer{
                                    font-size: 10px;
                                    margin-top: 50px;
                                }
                                .a{
                                    text-decoration: none;
                                }
                                .image-fluid{
                                    display: block;
                                    height: auto;
                                    margin-left: auto;
                                    margin-right: auto;
                                    margin-bottom: 30px;
                                    width: 80px;
                                }
                                h1{
                                    margin-bottom:30px
                                }
                            </style>
                        </head>
                        <body>
                            <div class="body">
                                <img src="https://drive.google.com/uc?export=view&id=145l-wTIHKXQbE0RLwymDEHaRwQ7L7oLw" class="image-fluid" alt="icons">
                            <h1 class="text-center">Password Reset Instructions</h1>
                            <div class="container">
                                <div class="card">
                                    <p> Hello """ + name + """, </p>
                                    <p>
                                        Click the button to reset your password for your TraderAlgo account.
                                    </p>
                                    <a href="https://localhost:3000/resetPassword?hash=""" + hash + """ " class="fw-bold text-center d-block">
                                        <button class="w-100 btn-lg btn-blue" role="button">
                                            RESET PASSWORD
                                        </button>
                                    </a>
                                    <p class="mt-3">
                                        Button not working for you? Copy the url below into your browser.
                                    </p>
                                    
                                    
                                    <a href="https://localhost:3000/resetPassword?hash=""" + hash + """ ">
                                        https://localhost:3000/resetPassword?hash=""" + hash + """
                                    </a>
                                    
                                    <p>
                                        Thank you, <br/>
                                        The TraderAlgo Team
                                    </p>
                                </div>
                                <div class="text-center footer">
                                    <p>
                                        &copy;  2022-2023 TraderAlgo, INC. 
                                    </p>
                                    <div class="">
                                        <a href="https://localhost:3000/termOfService">
                                            Terms of Service 
                                        </a>| <a href="https://localhost:3000/privacyPolicy">Privacy Policy</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </body>
                        </html>
                """, subtype='html')
        smtp.send_message(msg)


def send_notification(email, price, company_name, time, symbol, stock_exchange, name):
    params_query = f"{stock_exchange}:{symbol}"
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        msg = EmailMessage()
        msg['Subject'] = 'Executed Price Alert'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = email
        msg.set_content("""
                        Hello """ + name + """
                        Executed Price Alert
                        """ + company_name + """   A reached """ + str(price) + """ at """ + str(time) + """
                        """)
        msg.add_alternative("""
                            <head>
                    <style>
                        .body{
                            background-color: #eee;
                            padding:80px;
                        }
                        .btn-blue {
                            border: 0px;
                            background-color: #19B5FE;
                            color: white;
                            border-radius: 5px;
                            width: 100%;
                            padding: 20px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .text-center{
                            text-align: center;
                        }
                        .card{
                            background-color: white;
                            border-radius: 5px;
                            padding: 30px 70px;
                            width: 390px;
                            margin-left: auto;
                            margin-right: auto;
                        }
                        .footer{
                            font-size: 10px;
                            margin-top: 50px;
                        }
                        .a{
                            text-decoration: none;
                        }
                        .image-fluid{
                            display: block;
                            height: auto;
                            margin-left: auto;
                            margin-right: auto;
                            margin-bottom: 30px;
                            width: 80px;
                        }
                        h1{
                            margin-bottom:30px
                        }
                    </style>
                </head>
                <body>
                    <div class="body">
                        <img src="https://drive.google.com/uc?export=view&id=145l-wTIHKXQbE0RLwymDEHaRwQ7L7oLw" class="image-fluid" alt="icons">
                    <h1 class="text-center">Executed Price Alert</h1>
                    <div class="container">
                        <div class="card">
                            <p> Hello """ + name + """, </p>
                            <p>
                                """ + company_name + """   A reached """ + str(price) + """ at """ + str(time) + """
                            </p>
                            <a href="https://localhost:3000/equites/""" + params_query + """" class="fw-bold text-center d-block">
                                <button class="w-100 btn-lg btn-blue" role="button">
                                    View Full Quote 
                                </button>
                            </a>
                            <p>
                                Thank you, <br/>
                                The TraderAlgo Team
                            </p>
                        </div>
                        <div class="text-center footer">
                            <p>
                                &copy;  2022-2023 TraderAlgo, INC. 
                            </p>
                            <div class="">
                                <a href="https://localhost:3000/termOfService">
                                    Terms of Service 
                                </a>| <a href="https://localhost:3000/privacyPolicy">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
                </html>
                """, subtype='html')
        smtp.send_message(msg)
