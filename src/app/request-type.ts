export enum RequestType {
    LoginMeetingAdmin = 'LoginMeetingAdmin',
    CreateMeeting = 'CreateMeeting',
    JoinMeetingAsAdmin = 'JoinMeetingAsAdmin',
    JoinMeeting = 'JoinMeeting',
    GetParticipantsForMeeting = 'GetParticipantsForMeeting',
    JoinNewParticipant = 'JoinNewParticipant',
    RejoinMeetingAndParticipantWithLoginCipher = 'RejoinMeetingAndParticipantWithLoginCipher',
    RejoinParticipantWithPassword = 'RejoinParticipantWithPassword',
    GetOrCreateInstance = 'GetOrCreateInstance',
    ReconnectInstanceAdmin = 'ReconnectInstanceAdmin',
    AddNewInputEventHandler = 'AddNewInputEventHandler',
    AddNewVariable = 'AddNewVariable',
    StartCheckout = 'StartCheckout',
    ReconnectCheckout = 'ReconnectCheckout',
    ConnectCustomerScanner = 'ConnectCustomerScanner',
    InputReceived = 'InputReceived'
}
