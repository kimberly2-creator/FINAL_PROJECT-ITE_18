# Car Rental System - Use Case Diagram

## Actors
- Customer
- Admin
- System

## Main Use Cases

### Vehicle Management
- View Available Vehicles
- Search Vehicles
- Filter Vehicles
- View Vehicle Details

### Booking Management
- Create Booking
- Modify Booking
- Cancel Booking
- View Booking History

### Return Process
- Initiate Return
- Conduct Vehicle Inspection
- Assess Vehicle Condition
- Process Additional Charges
- Confirm Return
- Update Vehicle Status

### Notification System
- Send Booking Confirmation
- Send Return Reminder
- Send Payment Notification
- Send System Alert
- Send Return Confirmation

### Payment Processing
- Process Payment
- Generate Invoice
- Handle Refunds
- View Payment History

### User Management
- Register
- Login
- Update Profile
- View Profile

## Relationships
- Customer can perform all booking and return related actions
- Admin can manage all system functions
- System handles automated notifications and status updates

## Notes
- All notifications are automated and triggered by specific events
- Return process includes comprehensive vehicle inspection
- Payment processing is integrated with the return process 