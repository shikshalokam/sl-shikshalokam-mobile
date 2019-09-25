export const AppConfigs = {
    //Dev Urls

    appVersion: "1.0.0",
    appName: " Shikshalokam",

    // app_url: "https://dev.shikshalokam.org",
    // api_base_url: "https://devhome.shikshalokam.org/assessment-service/api/v1",
    // api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYTJiMTA5MWVlMDE0MDQ3OTdhYjRjZDI3ODJmYTFkZCJ9.olC-mJ9JVqeeIf-eyBVYciPIIsqDm46XHbKuO1GgNG0',
    // clientId: "sl-ionic-connect", 
    // environment: "Development",


    //Prod Urls
    // app_url: "https://community.shikshalokam.org",
    // api_base_url: "https://community.shikshalokam.org/assessment/api/v1",
    // api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzZGYxZGEyNDEwYzg0NTA1OGIwODQ2YmZkYjkyMzNjYSJ9.osbihbs4szlRkDI9x70wPBvC0MY3Rwdh6KapmTUFj5U',
    // clientId: "sl-ionic-connect",
    // environment: "Production",


    //Staging Urls
    app_url: "https://staging.shikshalokam.org",
    api_base_url: "https://staginghome.shikshalokam.org/assessment-service/api/v1",
    api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYTJiMTA5MWVlMDE0MDQ3OTdhYjRjZDI3ODJmYTFkZCJ9.olC-mJ9JVqeeIf-eyBVYciPIIsqDm46XHbKuO1GgNG0',
    clientId: "sl-ionic-connect",
    environment: "Staging",

        //Staging Home Urls
    // app_url: "https://staging.shikshalokam.org",
    // api_base_url: "https://staginghome.shikshalokam.org/assessment-service/api/v1",
    // api_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkYTJiMTA5MWVlMDE0MDQ3OTdhYjRjZDI3ODJmYTFkZCJ9.olC-mJ9JVqeeIf-eyBVYciPIIsqDm46XHbKuO1GgNG0',
    // clientId: "sl-ionic-connect",
    // environment: "Staging",

    configuration: {
        enableAssessmentListRefresh: true
    },
    keyCloak: {
        getAccessToken: "/auth/realms/sunbird/protocol/openid-connect/token",
        redirection_url: "http://localhost:8100/",
        logout_redirect_url: "http://localhost:8000/oauthLogoutcallback"
    },
    survey: {
        submission: "/submissions/make/",
        getImageUploadUr: "/files/getImageUploadUrl/",
        feedback: "/feedback/insert",
        getSubmissionStatus: "/submissions/status/",
        submitGeneralQuestions: "/submissions/generalQuestions/",
        checkIfSubmitted: "/submissions/isAllowed/",
        fetchIndividualAssessments: "/assessments/list",
        fetchAssessmentDetails:"/assessments/details/"
    },
    rating: {
        fetchRatingQuestions: '/submissions/fetchRatingQuestions/',
        submitRatings: '/submissions/submitRatingQuestions/'
    },
    flagging: {
        fetchRatedQuestions: '/submissions/fetchCriteriaRatings/',
        submitFlag: '/submissions/flagCriteriaRatings/'
    },
    parentInfo: {
        getParentRegisterForm: "/parentRegistry/form",
        addParentsInfo: "/parentRegistry/add",
        getParentList: "/parentRegistry/list/"
    },
    registry: {
        getLeaderRegisterForm: "/schoolLeaderRegistry/form",
        getTeacherRegisterForm: "/teacherRegistry/form",
        addLeaderInfo: "/schoolLeaderRegistry/add",
        addTeacherInfo: "/teacherRegistry/add",
        getTeacherList: "/teacherRegistry/list/",
        getLeaderList: "/schoolLeaderRegistry/list/"
    },
    feedback: {
        getFeedbackForm: '/feedback/form',
        submitFeedback: '/submissions/feedback/'
    },
    slack: {
        exceptionUrl: "https://hooks.slack.com/services/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",
    },
    help: {
        getHelpToken: "/appAccessToken/verify"
    }


}

export interface imageLocalListName {
    schoolId: string,
    evidenceId: string
}