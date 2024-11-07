This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
{
    "api": {
        "baseUrl": "https://api.hospital.com/v1",
        "endpoints": {
            "auth": {
                "POST /auth/login": {
                    "description": "Authenticate user and get access token",
                    "requestBody": {
                        "email": "string",
                        "password": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "accessToken": "string",
                            "refreshToken": "string",
                            "expiresIn": 3600
                        }
                    }
                },
                "POST /auth/refresh": {
                    "description": "Refresh access token",
                    "requestBody": {
                        "refreshToken": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "accessToken": "string",
                            "expiresIn": 3600
                        }
                    }
                },
                "POST /auth/logout": {
                    "description": "Invalidate current session",
                    "response": {
                        "status": 200,
                        "data": {
                            "message": "Logged out successfully"
                        }
                    }
                }
            },
            "patients": {
                "GET /patients": {
                    "description": "Get list of all patients",
                    "parameters": {
                        "page": "integer (optional)",
                        "limit": "integer (optional)",
                        "searchTerm": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "patients": [
                                {
                                    "id": "P001",
                                    "firstName": "John",
                                    "lastName": "Doe",
                                    "dateOfBirth": "1990-05-15",
                                    "gender": "male",
                                    "contactNumber": "+1-555-0123",
                                    "email": "john.doe@email.com",
                                    "address": "123 Main St, City, State 12345"
                                }
                            ],
                            "totalCount": 1,
                            "currentPage": 1,
                            "totalPages": 1
                        }
                    }
                },
                "GET /patients/{id}": {
                    "description": "Get patient details by ID",
                    "response": {
                        "status": 200,
                        "data": {
                            "id": "P001",
                            "firstName": "John",
                            "lastName": "Doe",
                            "dateOfBirth": "1990-05-15",
                            "gender": "male",
                            "contactNumber": "+1-555-0123",
                            "email": "john.doe@email.com",
                            "address": "123 Main St, City, State 12345",
                            "medicalHistory": [
                                {
                                    "condition": "Hypertension",
                                    "diagnosedDate": "2020-03-15",
                                    "status": "ongoing"
                                }
                            ]
                        }
                    }
                },
                "POST /patients": {
                    "description": "Create new patient",
                    "requestBody": {
                        "firstName": "string",
                        "lastName": "string",
                        "dateOfBirth": "date",
                        "gender": "string",
                        "contactNumber": "string",
                        "email": "string",
                        "address": "string"
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "P002",
                            "message": "Patient created successfully"
                        }
                    }
                }
            },
            "appointments": {
                "GET /appointments": {
                    "description": "Get list of appointments",
                    "parameters": {
                        "date": "date (optional)",
                        "doctorId": "string (optional)",
                        "patientId": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "appointments": [
                                {
                                    "id": "A001",
                                    "patientId": "P001",
                                    "doctorId": "D001",
                                    "dateTime": "2024-03-20T10:30:00Z",
                                    "status": "scheduled",
                                    "type": "regular checkup"
                                }
                            ]
                        }
                    }
                },
                "POST /appointments": {
                    "description": "Schedule new appointment",
                    "requestBody": {
                        "patientId": "string",
                        "doctorId": "string",
                        "dateTime": "datetime",
                        "type": "string"
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "A002",
                            "message": "Appointment scheduled successfully"
                        }
                    }
                }
            },
            "doctors": {
                "GET /doctors": {
                    "description": "Get list of doctors",
                    "parameters": {
                        "department": "string (optional)",
                        "specialization": "string (optional)"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "doctors": [
                                {
                                    "id": "D001",
                                    "firstName": "Jane",
                                    "lastName": "Smith",
                                    "specialization": "Cardiology",
                                    "department": "Cardiac Care",
                                    "availability": {
                                        "monday": "09:00-17:00",
                                        "tuesday": "09:00-17:00",
                                        "wednesday": "09:00-17:00",
                                        "thursday": "09:00-17:00",
                                        "friday": "09:00-15:00"
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            "prescriptions": {
                "GET /prescriptions/{patientId}": {
                    "description": "Get patient prescriptions",
                    "response": {
                        "status": 200,
                        "data": {
                            "prescriptions": [
                                {
                                    "id": "PR001",
                                    "patientId": "P001",
                                    "doctorId": "D001",
                                    "date": "2024-03-15",
                                    "medications": [
                                        {
                                            "name": "Amoxicillin",
                                            "dosage": "500mg",
                                            "frequency": "3 times daily",
                                            "duration": "7 days"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
                "POST /prescriptions": {
                    "description": "Create new prescription",
                    "requestBody": {
                        "patientId": "string",
                        "doctorId": "string",
                        "medications": [
                            {
                                "name": "string",
                                "dosage": "string",
                                "frequency": "string",
                                "duration": "string"
                            }
                        ]
                    },
                    "response": {
                        "status": 201,
                        "data": {
                            "id": "PR002",
                            "message": "Prescription created successfully"
                        }
                    }
                }
            },
            "billing": {
                "GET /bills/{patientId}": {
                    "description": "Get patient bills",
                    "response": {
                        "status": 200,
                        "data": {
                            "bills": [
                                {
                                    "id": "B001",
                                    "patientId": "P001",
                                    "date": "2024-03-15",
                                    "items": [
                                        {
                                            "description": "Consultation",
                                            "amount": 150.00
                                        },
                                        {
                                            "description": "Laboratory Tests",
                                            "amount": 300.00
                                        }
                                    ],
                                    "totalAmount": 450.00,
                                    "status": "pending"
                                }
                            ]
                        }
                    }
                },
                "POST /bills/payment": {
                    "description": "Process bill payment",
                    "requestBody": {
                        "billId": "string",
                        "amount": "number",
                        "paymentMethod": "string"
                    },
                    "response": {
                        "status": 200,
                        "data": {
                            "transactionId": "T001",
                            "message": "Payment processed successfully"
                        }
                    }
                }
            }
        }
    }
}
```
