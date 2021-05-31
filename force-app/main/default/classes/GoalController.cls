public with sharing class GoalController {
    @AuraEnabled(Cacheable=true)
    public static Goal__c[] getAllGoals() {
        return [
            SELECT
                Id,
                AccumulatedHours__c,
                End_date__c,
                Name,
                RealizedHours__c,
                Start_Date__c,
                Account__r.Name
            FROM Goal__c
            ORDER BY Name
            LIMIT 50
        ];
    }
    
    @AuraEnabled(Cacheable=true)
    public static Activity__c[] getAllActivities(String id) {
        return [
            SELECT
            Id,
            EstimatedHours__c,
            Name,
            Goal__c,
            RealizedHours__c,
            Status__c,
            lastModifiedDate
        FROM Activity__c
        WHERE Goal__c = :id
        ORDER BY lastModifiedDate DESC
        ];
    }
}