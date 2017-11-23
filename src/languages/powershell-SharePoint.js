/*
Language: PowerShell
Author: David Mohundro <david@mohundro.com>
Contributors: Nicholas Blumhardt <nblumhardt@nblumhardt.com>, Victor Zhou <OiCMudkips@users.noreply.github.com>, Nicolas Le Gall <contact@nlegall.fr>
*/

function(hljs) {
  var BACKTICK_ESCAPE = {
    begin: '`[\\s\\S]',
    relevance: 0
  };
  var VAR = {
    className: 'variable',
    variants: [
      {begin: /\$[\w\d][\w\d_:]*/}
    ]
  };
  var LITERAL = {
    className: 'literal',
    begin: /\$(null|true|false)\b/
  };
  var QUOTE_STRING = {
    className: 'string',
    variants: [
      { begin: /"/, end: /"/ },
      { begin: /@"/, end: /^"@/ }
    ],
    contains: [
      BACKTICK_ESCAPE,
      VAR,
      {
        className: 'variable',
        begin: /\$[A-z]/, end: /[^A-z]/
      }
    ]
  };
  var APOS_STRING = {
    className: 'string',
    variants: [
      { begin: /'/, end: /'/ },
      { begin: /@'/, end: /^'@/ }
    ]
  };

  var PS_HELPTAGS = {
    className: 'doctag',
    variants: [
      /* no paramater help tags */ 
      { begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/ },
      /* one parameter help tags */
      { begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/ }
    ]
  };
  var PS_COMMENT = hljs.inherit(
    hljs.COMMENT(null, null),
    {
      variants: [
        /* single-line comment */
        { begin: /#/, end: /$/ },
        /* multi-line comment */
        { begin: /<#/, end: /#>/ }
      ],
      contains: [PS_HELPTAGS]
    }
  );

  return {
    aliases: ['ps'],
    lexemes: /-?[A-z\.\-]+/,
    case_insensitive: true,
    keywords: {
      keyword: 'if else foreach return function do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch',
      built_in: 'Add-Computer Add-Content Add-History Add-JobTrigger Add-Member Add-PSSnapin Add-Type Checkpoint-Computer Clear-Content Clear-EventLog Clear-History Clear-Host Clear-Item Clear-ItemProperty Clear-Variable Compare-Object Complete-Transaction Connect-PSSession Connect-WSMan Convert-Path ConvertFrom-Csv ConvertFrom-Json ConvertFrom-SecureString ConvertFrom-StringData ConvertTo-Csv ConvertTo-Html ConvertTo-Json ConvertTo-SecureString ConvertTo-Xml Copy-Item Copy-ItemProperty Debug-Process Disable-ComputerRestore Disable-JobTrigger Disable-PSBreakpoint Disable-PSRemoting Disable-PSSessionConfiguration Disable-WSManCredSSP Disconnect-PSSession Disconnect-WSMan Disable-ScheduledJob Enable-ComputerRestore Enable-JobTrigger Enable-PSBreakpoint Enable-PSRemoting Enable-PSSessionConfiguration Enable-ScheduledJob Enable-WSManCredSSP Enter-PSSession Exit-PSSession Export-Alias Export-Clixml Export-Console Export-Counter Export-Csv Export-FormatData Export-ModuleMember Export-PSSession ForEach-Object Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-ComputerRestorePoint Get-Content Get-ControlPanelItem Get-Counter Get-Credential Get-Culture Get-Date Get-Event Get-EventLog Get-EventSubscriber Get-ExecutionPolicy Get-FormatData Get-Host Get-HotFix Get-Help Get-History Get-IseSnippet Get-Item Get-ItemProperty Get-Job Get-JobTrigger Get-Location Get-Member Get-Module Get-PfxCertificate Get-Process Get-PSBreakpoint Get-PSCallStack Get-PSDrive Get-PSProvider Get-PSSession Get-PSSessionConfiguration Get-PSSnapin Get-Random Get-ScheduledJob Get-ScheduledJobOption Get-Service Get-TraceSource Get-Transaction Get-TypeData Get-UICulture Get-Unique Get-Variable Get-Verb Get-WinEvent Get-WmiObject Get-WSManCredSSP Get-WSManInstance Group-Object Import-Alias Import-Clixml Import-Counter Import-Csv Import-IseSnippet Import-LocalizedData Import-PSSession Import-Module Invoke-AsWorkflow Invoke-Command Invoke-Expression Invoke-History Invoke-Item Invoke-RestMethod Invoke-WebRequest Invoke-WmiMethod Invoke-WSManAction Join-Path Limit-EventLog Measure-Command Measure-Object Move-Item Move-ItemProperty New-Alias New-Event New-EventLog New-IseSnippet New-Item New-ItemProperty New-JobTrigger New-Object New-Module New-ModuleManifest New-PSDrive New-PSSession New-PSSessionConfigurationFile New-PSSessionOption New-PSTransportOption New-PSWorkflowExecutionOption New-PSWorkflowSession New-ScheduledJobOption New-Service New-TimeSpan New-Variable New-WebServiceProxy New-WinEvent New-WSManInstance New-WSManSessionOption Out-Default Out-File Out-GridView Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Receive-Job Register-EngineEvent Register-ObjectEvent Register-PSSessionConfiguration Register-ScheduledJob Register-WmiEvent Remove-Computer Remove-Event Remove-EventLog Remove-Item Remove-ItemProperty Remove-Job Remove-JobTrigger Remove-Module Remove-PSBreakpoint Remove-PSDrive Remove-PSSession Remove-PSSnapin Remove-TypeData Remove-Variable Remove-WmiObject Remove-WSManInstance Rename-Computer Rename-Item Rename-ItemProperty Reset-ComputerMachinePassword Resolve-Path Restart-Computer Restart-Service Restore-Computer Resume-Job Resume-Service Save-Help Select-Object Select-String Select-Xml Send-MailMessage Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-JobTrigger Set-Location Set-PSBreakpoint Set-PSDebug Set-PSSessionConfiguration Set-ScheduledJob Set-ScheduledJobOption Set-Service Set-StrictMode Set-TraceSource Set-Variable Set-WmiInstance Set-WSManInstance Set-WSManQuickConfig Show-Command Show-ControlPanelItem Show-EventLog Sort-Object Split-Path Start-Job Start-Process Start-Service Start-Sleep Start-Transaction Start-Transcript Stop-Computer Stop-Job Stop-Process Stop-Service Stop-Transcript Suspend-Job Suspend-Service Tee-Object Test-ComputerSecureChannel Test-Connection Test-ModuleManifest Test-Path Test-PSSessionConfigurationFile Trace-Command Unblock-File Undo-Transaction Unregister-Event Unregister-PSSessionConfiguration Unregister-ScheduledJob Update-FormatData Update-Help Update-List Update-TypeData Use-Transaction Wait-Event Wait-Job Wait-Process Where-Object Write-Debug Write-Error Write-EventLog Write-Host Write-Output Write-Progress Write-Verbose Write-Warning Add-MDTPersistentDrive Disable-MDTMonitorService Enable-MDTMonitorService Get-MDTDeploymentShareStatistics Get-MDTMonitorData Get-MDTOperatingSystemCatalog Get-MDTPersistentDrive Import-MDTApplication Import-MDTDriver Import-MDTOperatingSystem Import-MDTPackage Import-MDTTaskSequence New-MDTDatabase Remove-MDTMonitorData Remove-MDTPersistentDrive Restore-MDTPersistentDrive Set-MDTMonitorData Test-MDTDeploymentShare Test-MDTMonitorData Update-MDTDatabaseSchema Update-MDTDeploymentShare Update-MDTLinkedDS Update-MDTMedia Update-MDTMedia Add-VamtProductKey Export-VamtData Find-VamtManagedMachine Get-VamtConfirmationId Get-VamtProduct Get-VamtProductKey Import-VamtData Initialize-VamtData Install-VamtConfirmationId Install-VamtProductActivation Install-VamtProductKey Update-VamtProduct Add-DatabaseToAvailabilityGroup Add-SPAppDeniedEndpoint Add-SPClaimTypeMapping Add-SPDiagnosticsPerformanceCounter Add-SPDistributedCacheServiceInstance Add-SPInfoPathUserAgent Add-SPProfileLeader Add-SPRoutingMachineInfo Add-SPRoutingMachinePool Add-SPRoutingRule Add-SPScaleOutDatabase Add-SPSecureStoreSystemAccount Add-SPServerScaleOutDatabase Add-SPServiceApplicationProxyGroupMember Add-SPShellAdmin Add-SPSiteSubscriptionFeaturePackMember Add-SPSiteSubscriptionProfileConfig Add-SPSolution Add-SPThrottlingRule Add-SPUserLicenseMapping Add-SPUserSolution Backup-SPConfigurationDatabase Backup-SPEnterpriseSearchServiceApplicationIndex Backup-SPFarm Backup-SPSite Clear-SPAppDeniedEndpointList Clear-SPBusinessDataCatalogEntityNotificationWeb Clear-SPDistributedCacheItem Clear-SPLogLevel Clear-SPMetadataWebServicePartitionData Clear-SPPerformancePointServiceApplicationTrustedLocation Clear-SPScaleOutDatabaseDeletedDataSubRange Clear-SPScaleOutDatabaseLog Clear-SPScaleOutDatabaseTenantData Clear-SPSecureStoreCredentialMapping Clear-SPSecureStoreDefaultProvider Clear-SPServerScaleOutDatabaseDeletedDataSubRange Clear-SPServerScaleOutDatabaseLog Clear-SPServerScaleOutDatabaseTenantData Clear-SPSiteSubscriptionBusinessDataCatalogConfig Connect-SPConfigurationDatabase Convert-SPWebApplication Copy-SPAccessServicesDatabaseCredentials Copy-SPBusinessDataCatalogAclToChildren Copy-SPSideBySideFiles Copy-SPSite Disable-SPAppAutoProvision Disable-SPBusinessDataCatalogEntity Disable-SPFeature Disable-SPInfoPathFormTemplate Disable-SPSessionStateService Disable-SPSingleSignOn Disable-SPTimerJob Disable-SPUserLicensing Disable-SPWebApplicationHttpThrottling Disable-SPWebTemplateForSiteMaster Disconnect-SPConfigurationDatabase Dismount-SPContentDatabase Dismount-SPStateServiceDatabase Enable-SPAppAutoProvision Enable-SPBusinessDataCatalogEntity Enable-SPFeature Enable-SPInfoPathFormTemplate Enable-SPSessionStateService Enable-SPTimerJob Enable-SPUserLicensing Enable-SPWebApplicationHttpThrottling Enable-SPWebTemplateForSiteMaster Export-SPAccessServicesDatabase Export-SPAppPackage Export-SPBusinessDataCatalogModel Export-SPEnterpriseSearchTopology Export-SPInfoPathAdministrationFiles Export-SPMetadataWebServicePartitionData Export-SPScaleOutDatabaseTenantData Export-SPServerScaleOutDatabaseTenantData Export-SPSiteSubscriptionBusinessDataCatalogConfig Export-SPSiteSubscriptionSettings Export-SPTagsAndNotesData Export-SPWeb Get-AvailabilityGroupStatus Get-SPAccessServiceApplication Get-SPAccessServicesApplication Get-SPAccessServicesDatabase Get-SPAccessServicesDatabaseServer Get-SPAccessServicesDatabaseServerGroup Get-SPAccessServicesDatabaseServerGroupMapping Get-SPAlternateURL Get-SPAppAcquisitionConfiguration Get-SPAppAutoProvisionConnection Get-SPAppDeniedEndpointList Get-SPAppDisablingConfiguration Get-SPAppDomain Get-SPAppHostingQuotaConfiguration Get-SPAppInstance Get-SPAppStoreConfiguration Get-SPAppStoreWebServiceConfiguration Get-SPAppPrincipal Get-SPAppScaleProfile Get-SPAppSiteSubscriptionName Get-SPAppDisablingConfiguration Get-SPAppStateSyncLastRunTime Get-SPAppStateUpdateInterval Get-SPAuthenticationProvider Get-SPAuthenticationRealm Get-SPBackupHistory Get-SPBingMapsBlock Get-SPBingMapsKey Get-SPBrowserCustomerExperienceImprovementProgram Get-SPBusinessDataCatalogEntityNotificationWeb Get-SPBusinessDataCatalogMetadataObject Get-SPBusinessDataCatalogThrottleConfig Get-SPCertificateAuthority Get-SPClaimProvider Get-SPClaimProviderManager Get-SPClaimTypeEncoding Get-SPConnectedServiceApplicationInformation Get-SPContentDatabase Get-SPContentDeploymentJob Get-SPContentDeploymentPath Get-SPCustomLayoutsPage Get-SPDatabase Get-SPDataConnectionFile Get-SPDataConnectionFileDependent Get-SPDesignerSettings Get-SPDiagnosticConfig Get-SPDiagnosticsPerformanceCounter Get-SPDiagnosticsProvider Get-SPDistributedCacheClientSetting Get-SPEnterpriseSearchComponent Get-SPEnterpriseSearchContentEnrichmentConfiguration Get-SPEnterpriseSearchCrawlContentSource Get-SPEnterpriseSearchCrawlCustomConnector Get-SPEnterpriseSearchCrawlDatabase Get-SPEnterpriseSearchCrawlExtension Get-SPEnterpriseSearchCrawlLogReadPermission Get-SPEnterpriseSearchCrawlMapping Get-SPEnterpriseSearchCrawlRule Get-SPEnterpriseSearchFileFormat Get-SPEnterpriseSearchHostController Get-SPEnterpriseSearchLanguageResourcePhrase Get-SPEnterpriseSearchLinguisticComponentsStatus Get-SPEnterpriseSearchLinksDatabase Get-SPEnterpriseSearchMetadataCategory Get-SPEnterpriseSearchMetadataCrawledProperty Get-SPEnterpriseSearchMetadataManagedProperty Get-SPEnterpriseSearchMetadataMapping Get-SPEnterpriseSearchOwner Get-SPEnterpriseSearchPropertyRule Get-SPEnterpriseSearchPropertyRuleCollection Get-SPEnterpriseSearchQueryAndSiteSettingsService Get-SPEnterpriseSearchQueryAndSiteSettingsServiceInstance Get-SPEnterpriseSearchQueryAndSiteSettingsServiceProxy Get-SPEnterpriseSearchQueryAuthority Get-SPEnterpriseSearchQueryDemoted Get-SPEnterpriseSearchQueryKeyword Get-SPEnterpriseSearchQuerySpellingCorrection Get-SPEnterpriseSearchQuerySuggestionCandidates Get-SPEnterpriseSearchRankingModel Get-SPEnterpriseSearchResultItemType Get-SPEnterpriseSearchResultSource Get-SPEnterpriseSearchSecurityTrimmer Get-SPEnterpriseSearchService Get-SPEnterpriseSearchServiceApplication Get-SPEnterpriseSearchServiceApplicationBackupStore Get-SPEnterpriseSearchServiceApplicationProxy Get-SPEnterpriseSearchServiceInstance Get-SPEnterpriseSearchSiteHitRule Get-SPEnterpriseSearchStatus Get-SPEnterpriseSearchTopology Get-SPEnterpriseSearchVssDataPath Get-SPFarm Get-SPFarmConfig Get-SPFeature Get-SPHelpCollection Get-SPInfoPathFormsService Get-SPInfoPathFormTemplate Get-SPInfoPathUserAgent Get-SPInfoPathWebServiceProxy Get-SPInsightsConfig Get-SPInternalAppStateSyncLastRunTime Get-SPInternalAppStateUpdateInterval Get-SPIRMSettings Get-SPLogEvent Get-SPLogLevel Get-SPManagedAccount Get-SPMarketplaceConnectionSettings Get-SPManagedPath Get-SPMetadataServiceApplication Get-SPMetadataServiceApplicationProxy Get-SPMicrofeedOptions Get-SPMobileMessagingAccount Get-SPODataConnectionSettingMetaData Get-SPOfficeStoreAppsDefaultActivation Get-SPPendingUpgradeActions Get-SPPerformancePointServiceApplication Get-SPPerformancePointServiceApplicationTrustedLocation Get-SPProcessAccount Get-SPProduct Get-SPProfileLeader Get-SPProfileServiceApplicationSecurity Get-SPRequestManagementSettings Get-SPRoutingMachineInfo Get-SPRoutingMachinePool Get-SPRoutingRule Get-SPScaleOutDatabase Get-SPScaleOutDatabaseDataState Get-SPScaleOutDatabaseInconsistency Get-SPScaleOutDatabaseLogEntry Get-SPSecureStoreApplication Get-SPSecureStoreSystemAccount Get-SPSecurityTokenServiceConfig Get-SPService Get-SPServer Get-SPServerScaleOutDatabase Get-SPServerScaleOutDatabaseDataState Get-SPServerScaleOutDatabaseInconsistency Get-SPServerScaleOutDatabaseLogEntry Get-SPServiceApplication Get-SPServiceApplicationEndpoint Get-SPServiceApplicationPool Get-SPServiceApplicationProxy Get-SPServiceApplicationProxyGroup Get-SPServiceApplicationSecurity Get-SPServiceContext Get-SPServiceHostConfig Get-SPServiceInstance Get-SPSessionStateService Get-SPShellAdmin Get-SPSite Get-SPSiteAdministration Get-SPSiteMaster Get-SPSiteSubscription Get-SPSiteSubscriptionConfig Get-SPSiteSubscriptionEdiscoveryHub Get-SPSiteSubscriptionEdiscoverySearchScope Get-SPSiteSubscriptionFeaturePack Get-SPSiteSubscriptionIRMConfig Get-SPSiteSubscriptionMetadataConfig Get-SPSiteUpgradeSessionInfo Get-SPSiteUrl Get-SPSolution Get-SPStateServiceApplication Get-SPStateServiceApplicationProxy Get-SPStateServiceDatabase Get-SPTaxonomySession Get-SPThrottlingRule Get-SPTimerJob Get-SPTopologyServiceApplication Get-SPTopologyServiceApplicationProxy Get-SPTrustedIdentityTokenIssuer Get-SPTrustedRootAuthority Get-SPTrustedSecurityTokenIssuer Get-SPUpgradeActions Get-SPUsageApplication Get-SPUsageDefinition Get-SPUsageService Get-SPUser Get-SPUserLicense Get-SPUserLicenseMapping Get-SPUserLicensing Get-SPUserSolution Get-SPVisioExternalData Get-SPVisioPerformance Get-SPVisioSafeDataProvider Get-SPVisioServiceApplication Get-SPVisioServiceApplicationProxy Get-SPWeb Get-SPWebApplication Get-SPWebApplicationAppDomain Get-SPWebApplicationHttpThrottlingMonitor Get-SPWebPartPack Get-SPWebTemplate Get-SPWebTemplatesEnabledForSiteMaster Get-SPWorkflowConfig Get-SPWOPIBinding Get-SPWOPISuppressionSetting Get-SPWOPIZone Grant-SPBusinessDataCatalogMetadataObject Grant-SPObjectSecurity Import-SPAccessServicesDatabase Import-SPAppPackage Import-SPBusinessDataCatalogDotNetAssembly Import-SPBusinessDataCatalogModel Import-SPEnterpriseSearchCustomExtractionDictionary Import-SPEnterpriseSearchPopularQueries Import-SPEnterpriseSearchThesaurus Import-SPEnterpriseSearchTopology Import-SPInfoPathAdministrationFiles Import-SPMetadataWebServicePartitionData Import-SPScaleOutDatabaseTenantData Import-SPServerScaleOutDatabaseTenantData Import-SPSiteSubscriptionSettings Import-SPWeb Initialize-SPResourceSecurity Initialize-SPStateServiceDatabase Install-SPApp Install-SPApplicationContent Install-SPDataConnectionFile Install-SPFeature Install-SPHelpCollection Install-SPInfoPathFormTemplate Install-SPService Install-SPSolution Install-SPUserSolution Install-SPWebPartPack Merge-SPLogFile Mount-SPContentDatabase Mount-SPStateServiceDatabase Move-SPBlobStorageLocation Move-SPDeletedSite Move-SPEnterpriseSearchLinksDatabases Move-SPProfileManagedMetadataProperty Move-SPSocialComment Move-SPSite Move-SPUser New-SPAccessServiceApplication New-SPAccessServicesApplication New-SPAccessServicesDatabaseServer New-SPAlternateUrl New-SPAppManagementServiceApplication New-SPAppManagementServiceApplicationProxy New-SPAuthenticationProvider New-SPAzureAccessControlServiceApplicationProxy New-SPBECWebServiceApplicationProxy New-SPBusinessDataCatalogServiceApplication New-SPBusinessDataCatalogServiceApplicationProxy New-SPCentralAdministration New-SPClaimProvider New-SPClaimsPrincipal New-SPClaimTypeEncoding New-SPClaimTypeMapping New-SPConfigurationDatabase New-SPContentDatabase New-SPContentDeploymentJob New-SPContentDeploymentPath New-SPEnterpriseSearchAdminComponent New-SPEnterpriseSearchAnalyticsProcessingComponent New-SPEnterpriseSearchContentEnrichmentConfiguration New-SPEnterpriseSearchContentProcessingComponent New-SPEnterpriseSearchCrawlComponent New-SPEnterpriseSearchCrawlContentSource New-SPEnterpriseSearchCrawlCustomConnector New-SPEnterpriseSearchCrawlDatabase New-SPEnterpriseSearchCrawlExtension New-SPEnterpriseSearchCrawlMapping New-SPEnterpriseSearchCrawlRule New-SPEnterpriseSearchFileFormat New-SPEnterpriseSearchIndexComponent New-SPEnterpriseSearchLanguageResourcePhrase New-SPEnterpriseSearchLinksDatabase New-SPEnterpriseSearchMetadataCategory New-SPEnterpriseSearchMetadataCrawledProperty New-SPEnterpriseSearchMetadataManagedProperty New-SPEnterpriseSearchMetadataMapping New-SPEnterpriseSearchQueryAuthority New-SPEnterpriseSearchQueryDemoted New-SPEnterpriseSearchQueryKeyword New-SPEnterpriseSearchQueryProcessingComponent New-SPEnterpriseSearchRankingModel New-SPEnterpriseSearchResultItemType New-SPEnterpriseSearchResultSource New-SPEnterpriseSearchSecurityTrimmer New-SPEnterpriseSearchServiceApplication New-SPEnterpriseSearchServiceApplicationProxy New-SPEnterpriseSearchSiteHitRule New-SPEnterpriseSearchTopology New-SPLogFile New-SPManagedAccount New-SPManagedPath New-SPMarketplaceWebServiceApplicationProxy New-SPMetadataServiceApplication New-SPMetadataServiceApplicationProxy New-SPODataConnectionSetting New-SPPerformancePointServiceApplication New-SPPerformancePointServiceApplicationProxy New-SPPerformancePointServiceApplicationTrustedLocation New-SPPowerPointConversionServiceApplication New-SPPowerPointConversionServiceApplicationProxy New-SPProfileServiceApplication New-SPProfileServiceApplicationProxy New-SPRequestManagementRuleCriteria New-SPSecureStoreApplication New-SPSecureStoreApplicationField New-SPSecureStoreServiceApplication New-SPSecureStoreServiceApplicationProxy New-SPSecureStoreTargetApplication New-SPServiceApplicationPool New-SPServiceApplicationProxyGroup New-SPSite New-SPSiteMaster New-SPSiteSubscription New-SPSiteSubscriptionFeaturePack New-SPStateServiceApplication New-SPStateServiceApplicationProxy New-SPStateServiceDatabase New-SPSubscriptionSettingsServiceApplication New-SPSubscriptionSettingsServiceApplicationProxy New-SPTranslationServiceApplication New-SPTranslationServiceApplicationProxy New-SPTrustedIdentityTokenIssuer New-SPTrustedRootAuthority New-SPTrustedSecurityTokenIssuer New-SPTrustedServiceTokenIssuer New-SPUsageApplication New-SPUsageLogFile New-SPUser New-SPUserLicenseMapping New-SPVisioSafeDataProvider New-SPVisioServiceApplication New-SPVisioServiceApplicationProxy New-SPWeb New-SPWebApplication New-SPWebApplicationAppDomain New-SPWebApplicationExtension New-SPWOPIBinding New-SPWOPISuppressionSetting New-SPWordConversionServiceApplication New-SPWorkManagementServiceApplication New-SPWorkManagementServiceApplicationProxy Publish-SPServiceApplication Register-SPAppPrincipal Register-SPWorkflowService Remove-DatabaseFromAvailabilityGroup Remove-SPAccessServicesDatabaseServer Remove-SPAlternateUrl Remove-SPAppDeniedEndpoint Remove-SPAppPrincipalPermission Remove-SPBusinessDataCatalogModel Remove-SPCentralAdministration Remove-SPClaimProvider Remove-SPClaimTypeMapping Remove-SPConfigurationDatabase Remove-SPContentDatabase Remove-SPContentDeploymentJob Remove-SPContentDeploymentPath Remove-SPDiagnosticsPerformanceCounter Remove-SPDistributedCacheServiceInstance Remove-SPEnterpriseSearchComponent Remove-SPEnterpriseSearchContentEnrichmentConfiguration Remove-SPEnterpriseSearchCrawlContentSource Remove-SPEnterpriseSearchCrawlCustomConnector Remove-SPEnterpriseSearchCrawlDatabase Remove-SPEnterpriseSearchCrawlExtension Remove-SPEnterpriseSearchCrawlLogReadPermission Remove-SPEnterpriseSearchCrawlMapping Remove-SPEnterpriseSearchCrawlRule Remove-SPEnterpriseSearchFileFormat Remove-SPEnterpriseSearchLanguageResourcePhrase Remove-SPEnterpriseSearchLinksDatabase Remove-SPEnterpriseSearchMetadataCategory Remove-SPEnterpriseSearchMetadataManagedProperty Remove-SPEnterpriseSearchMetadataMapping Remove-SPEnterpriseSearchQueryAuthority Remove-SPEnterpriseSearchQueryDemoted Remove-SPEnterpriseSearchQueryKeyword Remove-SPEnterpriseSearchRankingModel Remove-SPEnterpriseSearchResultItemType Remove-SPEnterpriseSearchResultSource Remove-SPEnterpriseSearchSecurityTrimmer Remove-SPEnterpriseSearchServiceApplication Remove-SPEnterpriseSearchServiceApplicationProxy Remove-SPEnterpriseSearchSiteHitRule Remove-SPEnterpriseSearchTenantConfiguration Remove-SPEnterpriseSearchTenantSchema Remove-SPEnterpriseSearchTopology Remove-SPInfoPathUserAgent Remove-SPManagedAccount Remove-SPManagedPath Remove-SPODataConnectionSetting Remove-SPPerformancePointServiceApplication Remove-SPPerformancePointServiceApplicationProxy Remove-SPPerformancePointServiceApplicationTrustedLocation Remove-SPProfileLeader Remove-SPRoutingMachineInfo Remove-SPRoutingMachinePool Remove-SPRoutingRule Remove-SPScaleOutDatabase Remove-SPSecureStoreApplication Remove-SPSecureStoreSystemAccount Remove-SPServerScaleOutDatabase Remove-SPServiceApplication Remove-SPServiceApplicationPool Remove-SPServiceApplicationProxy Remove-SPServiceApplicationProxyGroup Remove-SPServiceApplicationProxyGroupMember Remove-SPShellAdmin Remove-SPSite Remove-SPSiteMaster Remove-SPSiteSubscription Remove-SPSiteSubscriptionBusinessDataCatalogConfig Remove-SPSiteSubscriptionFeaturePack Remove-SPSiteSubscriptionFeaturePackMember Remove-SPSiteSubscriptionMetadataConfig Remove-SPSiteSubscriptionProfileConfig Remove-SPSiteSubscriptionSettings Remove-SPSiteUpgradeSessionInfo Remove-SPSiteUrl Remove-SPSocialItemByDate Remove-SPSolution Remove-SPSolutionDeploymentLock Remove-SPStateServiceDatabase Remove-SPThrottlingRule Remove-SPTranslationServiceJobHistory Remove-SPTrustedIdentityTokenIssuer Remove-SPTrustedRootAuthority Remove-SPTrustedSecurityTokenIssuer Remove-SPTrustedServiceTokenIssuer Remove-SPUsageApplication Remove-SPUser Remove-SPUserLicenseMapping Remove-SPUserSolution Remove-SPVisioSafeDataProvider Remove-SPWeb Remove-SPWebApplication Remove-SPWebApplicationAppDomain Remove-SPWOPIBinding Remove-SPWOPISuppressionSetting Remove-SPWordConversionServiceJobHistory Rename-SPServer Repair-SPManagedAccountDeployment Repair-SPSite Request-SPUpgradeEvaluationSite Reset-SPAccessServicesDatabasePassword Reset-SPSites Restart-SPAppInstanceJobs Restore-SPEnterpriseSearchServiceApplication Restore-SPEnterpriseSearchServiceApplicationIndex Restore-SPFarm Restore-SPSite Resume-SPEnterpriseSearchServiceApplication Resume-SPStateServiceDatabase Revoke-SPBusinessDataCatalogMetadataObject Revoke-SPObjectSecurity Set-SPAccessServicesApplication Set-SPAccessServicesDatabaseServer Set-SPAccessServicesDatabaseServerGroupMapping Set-SPAccessServiceApplication Set-SPAlternateUrl Set-SPAppAcquisitionConfiguration Set-SPAppAutoProvisionConnection Set-SPAppDisablingConfiguration Set-SPAppDomain Set-SPAppHostingQuotaConfiguration Set-SPAppManagementDeploymentId Set-SPAppStoreConfiguration Set-SPAppStoreWebServiceConfiguration Set-SPAppPrincipalPermission Set-SPAppScaleProfile Set-SPAppSiteSubscriptionName Set-SPAppDisablingConfiguration Set-SPAppStateUpdateInterval Set-SPAuthenticationRealm Set-SPBingMapskey Set-SPBrowserCustomerExperienceImprovementProgram Set-SPBusinessDataCatalogEntityNotificationWeb Set-SPBusinessDataCatalogMetadataObject Set-SPBusinessDataCatalogServiceApplication Set-SPBusinessDataCatalogThrottleConfig Set-SPCentralAdministration Set-SPClaimProvider Set-SPContentDatabase Set-SPContentDeploymentJob Set-SPContentDeploymentPath Set-SPCustomLayoutsPage Set-SPDataConnectionFile Set-SPDefaultProfileConfig Set-SPDesignerSettings Set-SPDiagnosticConfig Set-SPDiagnosticsProvider Set-SPDistributedCacheClientSetting Set-SPEnterpriseSearchContentEnrichmentConfiguration Set-SPEnterpriseSearchCrawlContentSource Set-SPEnterpriseSearchCrawlDatabase Set-SPEnterpriseSearchCrawlLogReadPermission Set-SPEnterpriseSearchCrawlRule Set-SPEnterpriseSearchDCTMConnectorConfig Set-SPEnterpriseSearchFileFormatState Set-SPEnterpriseSearchLinguisticComponentsStatus Set-SPEnterpriseSearchLinksDatabase Set-SPEnterpriseSearchMetadataCategory Set-SPEnterpriseSearchMetadataCrawledProperty Set-SPEnterpriseSearchMetadataManagedProperty Set-SPEnterpriseSearchMetadataMapping Set-SPEnterpriseSearchPrimaryHostController Set-SPEnterpriseSearchQueryAuthority Set-SPEnterpriseSearchQuerySpellingCorrection Set-SPEnterpriseSearchRankingModel Set-SPEnterpriseSearchResultItemType Set-SPEnterpriseSearchResultSource Set-SPEnterpriseSearchService Set-SPEnterpriseSearchServiceApplication Set-SPEnterpriseSearchServiceApplicationProxy Set-SPEnterpriseSearchServiceInstance Set-SPEnterpriseSearchTopology Set-SPFarmConfig Set-SPInfoPathFormsService Set-SPInfoPathFormTemplate Set-SPInfoPathWebServiceProxy Set-SPInternalAppStateUpdateInterval Set-SPIRMSettings Set-SPLogLevel Set-SPManagedAccount Set-SPMarketplaceConnectionSettings Set-SPMetadataServiceApplication Set-SPMetadataServiceApplicationProxy Set-SPMobileMessagingAccount Set-SPODataConnectionSetting Set-SPODataConnectionSettingMetaData Set-SPOfficeStoreAppsDefaultActivation Set-SPPassPhrase Set-SPPerformancePointSecureDataValues Set-SPPerformancePointServiceApplication Set-SPPowerPointConversionServiceApplication Set-SPProfileServiceApplication Set-SPProfileServiceApplicationProxy Set-SPProfileServiceApplicationSecurity Set-SPRequestManagementSettings Set-SPRoutingMachineInfo Set-SPRoutingMachinePool Set-SPRoutingRule Set-SPScaleOutDatabaseDataRange Set-SPScaleOutDatabaseDataSubRange Set-SPSecureStoreApplication Set-SPSecureStoreDefaultProvider Set-SPSecureStoreServiceApplication Set-SPSecurityTokenServiceConfig Set-SPServerScaleOutDatabaseDataRange Set-SPServerScaleOutDatabaseDataSubRange Set-SPServer Set-SPServiceApplication Set-SPServiceApplicationEndpoint Set-SPServiceApplicationPool Set-SPServiceApplicationSecurity Set-SPServiceHostConfig Set-SPSessionStateService Set-SPSite Set-SPSiteAdministration Set-SPSiteSubscriptionConfig Set-SPSiteSubscriptionEdiscoveryHub Set-SPSiteSubscriptionIRMConfig Set-SPSiteSubscriptionMetadataConfig Set-SPSiteSubscriptionProfileConfig Set-SPSiteUrl Set-SPStateServiceApplication Set-SPStateServiceApplicationProxy Set-SPStateServiceDatabase Set-SPSubscriptionSettingsServiceApplication Set-SPThrottlingRule Set-SPTimerJob Set-SPTopologyServiceApplication Set-SPTopologyServiceApplicationProxy Set-SPTranslationServiceApplication Set-SPTranslationServiceApplicationProxy Set-SPTrustedIdentityTokenIssuer Set-SPTrustedRootAuthority Set-SPTrustedSecurityTokenIssuer Set-SPTrustedServiceTokenIssuer Set-SPUsageApplication Set-SPUsageDefinition Set-SPUsageService Set-SPUser Set-SPVisioExternalData Set-SPVisioPerformance Set-SPVisioSafeDataProvider Set-SPVisioServiceApplication Set-SPWeb Set-SPWebApplication Set-SPWebApplicationHttpThrottlingMonitor Set-SPWOPIBinding Set-SPWOPIZone Set-SPWordConversionServiceApplication Set-SPWorkflowConfig Set-SPWorkManagementServiceApplication Set-SPWorkManagementServiceApplicationProxy Split-SPScaleOutDatabase Split-SPServerScaleOutDatabase Start-SPAdminJob Start-SPAssignment Start-SPContentDeploymentJob Start-SPEnterpriseSearchQueryAndSiteSettingsServiceInstance Start-SPEnterpriseSearchServiceInstance Start-SPInfoPathFormTemplate Start-SPService Start-SPServiceInstance Start-SPTimerJob Stop-SPAssignment Start-SPDiagnosticsSession Stop-SPDiagnosticsSession Stop-SPDistributedCacheServiceInstance Stop-SPEnterpriseSearchQueryAndSiteSettingsServiceInstance Stop-SPEnterpriseSearchServiceInstance Stop-SPInfoPathFormTemplate Stop-SPService Stop-SPServiceInstance Suspend-SPEnterpriseSearchServiceApplication Suspend-SPEnterpriseSearchServiceApplication Suspend-SPStateServiceDatabase Test-SPContentDatabase Test-SPInfoPathFormTemplate Test-SPSite Uninstall-SPAppInstance Uninstall-SPDataConnectionFile Uninstall-SPFeature Uninstall-SPHelpCollection Uninstall-SPInfoPathFormTemplate Uninstall-SPSolution Uninstall-SPUserSolution Uninstall-SPWebPartPack Unpublish-SPServiceApplication Update-SPAppCatalogSettings Update-SPAppInstance Update-SPDistributedCacheSize Update-SPFarmEncryptionKey Update-SPInfoPathAdminFileUrl Update-SPInfoPathUserFileUrl Update-SPMicrofeedOptions Update-SPProfilePhotoStore Update-SPRepopulateMicroblogFeedCache Update-SPRepopulateMicroblogLMTCache Update-SPSecureStoreApplicationServerKey Update-SPSecureStoreCredentialMapping Update-SPSecureStoreGroupCredentialMapping Update-SPSecureStoreMasterKey Update-SPSolution Update-SPUserSolution Update-SPWOPIProofKey Upgrade-SPContentDatabase Upgrade-SPEnterpriseSearchServiceApplication Upgrade-SPFarm Upgrade-SPProfileServiceApplication Upgrade-SPSingleSignOnDatabase Upgrade-SPSite',
      nomarkup: '-ne -eq -lt -gt -ge -le -not -like -notlike -match -notmatch -contains -notcontains -in -notin -replace'
    },
    contains: [
      BACKTICK_ESCAPE,
      hljs.NUMBER_MODE,
      QUOTE_STRING,
      APOS_STRING,
      LITERAL,
      VAR,
      PS_COMMENT
    ]
  };
}
