(function($, cloudStack, testData) {
  cloudStack.installWizard = {
    // Check if install wizard should be invoked
    check: function(args) {
      args.response.success({
        doInstall: false
      });

      // $.ajax({
      //   url: createURL('listZones'),
      //   dataType: 'json',
      //   async: true,
      //   success: function(data) {
      //     args.response.success({
      //       doInstall: !data.listzonesresponse.zone
      //     });
      //   }
      // });
    },

    changeUser: function(args) {
      $.ajax({
        url: createURL('updateUser'),
        data: {
          id: cloudStack.context.users[0].userid,
          password: md5Hashed ? $.md5(args.data.password) : args.data.password
        },
        dataType: 'json',
        async: true,
        success: function(data) {
          args.response.success({
            data: { newUser: data.updateuserresponse.user }
          });
        }
      });
    },

    // Copy text
    copy: {
      // Tooltips
      'tooltip.addZone.name': function(args) {
        args.response.success({
          text: 'A name for the zone.'
        });
      },

      'tooltip.addZone.dns1': function(args) {
        args.response.success({
          text: 'These are DNS servers for use by guest VMs in the zone. These DNS servers will be accessed via the public network you will add later. The public IP addresses for the zone must have a route to the DNS server named here.'
        });
      },

      'tooltip.addZone.dns2': function(args) {
        args.response.success({
          text: 'These are DNS servers for use by guest VMs in the zone. These DNS servers will be accessed via the public network you will add later. The public IP addresses for the zone must have a route to the DNS server named here.'
        });
      },

      'tooltip.addZone.internaldns1': function(args) {
        args.response.success({
          text: 'These are DNS servers for use by system VMs in the zone. These DNS servers will be accessed via the private network interface of the System VMs. The private IP address you provide for the pods must have a route to the DNS server named here.'
        });
      },

      'tooltip.addZone.internaldns2': function(args) {
        args.response.success({
          text: 'These are DNS servers for use by system VMs in the zone. These DNS servers will be accessed via the private network interface of the System VMs. The private IP address you provide for the pods must have a route to the DNS server named here.'
        });
      },

      'tooltip.addGuestNetwork.name': function(args) {
        args.response.success({
          text: 'A name for your network'
        });
      },

      'tooltip.addGuestNetwork.description': function(args) {
        args.response.success({
          text: 'A description for your network'
        });
      },

      'tooltip.addGuestNetwork.guestGateway': function(args) {
        args.response.success({
          text: 'The gateway that the guests should use'
        });
      },

      'tooltip.addGuestNetwork.guestNetmask': function(args) {
        args.response.success({
          text: 'The netmask in use on the subnet that the guests should use'
        });
      },

      'tooltip.addGuestNetwork.guestStartIp': function(args) {
        args.response.success({
          text: 'The range of IP addresses that will be available for allocation to guests in this zone.  If one NIC is used, these IPs should be in the same CIDR as the pod CIDR.'
        });
      },

      'tooltip.addGuestNetwork.guestEndIp': function(args) {
        args.response.success({
          text: 'The range of IP addresses that will be available for allocation to guests in this zone.  If one NIC is used, these IPs should be in the same CIDR as the pod CIDR.'
        });
      },

      'tooltip.addPod.name': function(args) {
        args.response.success({
          text: 'A name for the pod'
        });
      },

      'tooltip.addPod.gateway': function(args) {
        args.response.success({
          text: 'The gateway for the hosts in that pod.'
        });
      },

      'tooltip.addPod.netmask': function(args) {
        args.response.success({
          text: 'The netmask in use on the subnet the guests will use.'
        });
      },

      'tooltip.addPod.startip': function(args) {
        args.response.success({
          text: 'This is the IP range in the private network that the CloudStack uses to manage Secondary Storage VMs and Console Proxy VMs. These IP addresses are taken from the same subnet as computing servers.'
        });
      },

      'tooltip.addPod.endip': function(args) {
        args.response.success({
          text: 'This is the IP range in the private network that the CloudStack uses to manage Secondary Storage VMs and Console Proxy VMs. These IP addresses are taken from the same subnet as computing servers.'
        });
      },

      'tooltip.addCluster.name': function(args) {
        args.response.success({
          text: 'A name for the cluster.  This can be text of your choosing and is not used by CloudStack.'
        });
      },

      'tooltip.addHost.hostname': function(args) {
        args.response.success({
          text: 'The DNS name or IP address of the host.'
        });
      },

      'tooltip.addHost.username': function(args) {
        args.response.success({
          text: 'Usually root.'
        });
      },

      'tooltip.addHost.password': function(args) {
        args.response.success({
          text: 'This is the password for the user named above (from your XenServer install).'
        });
      },

      'tooltip.addHost.hosttags': function(args) {
        args.response.success({
          text: '(Optional) Any labels that you use to categorize hosts for ease of maintenance.'
        });
      },

      'tooltip.addPrimaryStorage.name': function(args) {
        args.response.success({
          text: 'The name for the storage device.'
        });
      },

      'tooltip.addPrimaryStorage.server': function(args) {
        args.response.success({
          text: '(for NFS, iSCSI, or PreSetup) The IP address or DNS name of the storage device.'
        });
      },

      'tooltip.addPrimaryStorage.path': function(args) {
        args.response.success({
          text: '(for NFS) In NFS this is the exported path from the server. Path (for SharedMountPoint).  With KVM this is the path on each host that is where this primary storage is mounted.  For example, "/mnt/primary".'
        });
      },

      'tooltip.addPrimaryStorage.storageTags': function(args) {
        args.response.success({
          text: 'A comma-separated list of any desired tags that you use to categorize storage devices.'
        });
      },

      'tooltip.addSecondaryStorage.nfsServer': function(args) {
        args.response.success({
          text: 'The IP address of the NFS server hosting the secondary storage'
        });
      },

      'tooltip.addSecondaryStorage.path': function(args) {
        args.response.success({
          text: 'The exported path, located on the server you specified above'
        });
      },

      // Intro text
      whatIsCloudStack: function(args) {
        args.response.success({
          text: 'CloudStack&#8482 is a software platform that pools computing resources to build public, private, and hybrid Infrastructure as a Service (IaaS) clouds. CloudStack&#8482 manages the network, storage, and compute nodes that make up a cloud infrastructure. Use CloudStack&#8482 to deploy, manage, and configure cloud computing environments.<br/><br/>Extending beyond individual virtual machine images running on commodity hardware, CloudStack&#8482 provides a turnkey cloud infrastructure software stack for delivering virtual datacenters as a service - delivering all of the essential components to build, deploy, and manage multi-tier and multi-tenant cloud applications. Both open-source and Premium versions are available, with the open-source version offering nearly identical features. '
        });
      },

      whatIsAZone: function(args) {
        args.response.success({
          text: 'A zone is the largest organizational unit within a CloudStack&#8482; deployment. A zone typically corresponds to a single datacenter, although it is permissible to have multiple zones in a datacenter. The benefit of organizing infrastructure into zones is to provide physical isolation and redundancy. For example, each zone can have its own power supply and network uplink, and the zones can be widely separated geographically (though this is not required).'
        });
      },

      whatIsAPod: function(args) {
        args.response.success({
          text: 'A pod often represents a single rack. Hosts in the same pod are in the same subnet.<br/><br/>A pod is the second-largest organizational unit within a CloudStack&#8482; deployment. Pods are contained within zones. Each zone can contain one or more pods; in the Basic Installation, you will have just one pod in your zone'
        });
      },

      whatIsACluster: function(args) {
        args.response.success({
          text: 'A cluster provides a way to group hosts. The hosts in a cluster all have identical hardware, run the same hypervisor, are on the same subnet, and access the same shared storage. Virtual machine instances (VMs) can be live-migrated from one host to another within the same cluster, without interrupting service to the user. A cluster is the third-largest organizational unit within a CloudStack&#8482; deployment. Clusters are contained within pods, and pods are contained within zones.<br/><br/>CloudStack&#8482; allows multiple clusters in a cloud deployment, but for a Basic Installation, we only need one cluster. '
        });
      },

      whatIsAHost: function(args) {
        args.response.success({
          text: 'A host is a single computer. Hosts provide the computing resources that run the guest virtual machines. Each host has hypervisor software installed on it to manage the guest VMs (except for bare metal hosts, which are a special case discussed in the Advanced Installation Guide). For example, a Linux KVM-enabled server, a Citrix XenServer server, and an ESXi server are hosts. In a Basic Installation, we use a single host running XenServer.<br/><br/>The host is the smallest organizational unit within a CloudStack&#8482; deployment. Hosts are contained within clusters, clusters are contained within pods, and pods are contained within zones. '
        });
      },

      whatIsPrimaryStorage: function(args) {
        args.response.success({
          text: 'A CloudStack&#8482; cloud infrastructure makes use of two types of storage: primary storage and secondary storage. Both of these can be iSCSI or NFS servers, or localdisk.<br/><br/><strong>Primary storage</strong> is associated with a cluster, and it stores the disk volumes of each guest VM for all the VMs running on hosts in that cluster. The primary storage server is typically located close to the hosts. '
        });
      },

      whatIsSecondaryStorage: function(args) {
        args.response.success({
          text: 'Secondary storage is associated with a zone, and it stores the following:<ul><li>Templates - OS images that can be used to boot VMs and can include additional configuration information, such as installed applications</li><li>ISO images - OS images that can be bootable or non-bootable</li><li>Disk volume snapshots - saved copies of VM data which can be used for data recovery or to create new templates</ul>'
        });
      }
    },

    action: function(args) {
      var complete = args.response.success;
      var data = args.data;

      var createZone = function(args) {
        var addZoneAction = function(args) {
          var array1 = [];

          //var networktype = $thisWizard.find("#step1").find("input:radio[name=basic_advanced]:checked").val();  //"Basic", "Advanced"
          var networktype = 'Basic';
          array1.push("&networktype=" + todb(networktype));

          array1.push("&name=" + todb(args.data.name));

          array1.push("&dns1=" + todb(args.data.dns1));

          var dns2 = args.data.dns2;
          if (dns2 != null && dns2.length > 0)
            array1.push("&dns2=" + todb(dns2));

          array1.push("&internaldns1="+todb(args.data.internaldns1));

          var internaldns2 = args.data.internaldns2;
          if (internaldns2 != null && internaldns2.length > 0)
            array1.push("&internaldns2=" + todb(internaldns2));

          if(networktype == "Advanced") {
            //if(args.data["isolation-mode"] == "security-groups") {
            //  array1.push("&securitygroupenabled=true");
            //}
            //else { //args.data["isolation-mode"] == "vlan"
            array1.push("&securitygroupenabled=false");

            var guestcidraddress = args.data["guest-cidr"];
            if(guestcidraddress != null && guestcidraddress.length > 0) {
              array1.push("&guestcidraddress="+todb(guestcidraddress));
            }
            //}
          }

          var zoneId;
          $.ajax({
            url: createURL("createZone" + array1.join("")),
            dataType: "json",
            async: false,
            success: function(json) {
              var zoneObj = json.createzoneresponse.zone;
              zoneId = zoneObj.id;

              //NaaS (begin)
              var physicalNetworkId;
              $.ajax({
                url: createURL("listPhysicalNetworks&zoneId=" + zoneId),
                dataType: "json",
                async: false,
                success: function(json) {
                  var items = json.listphysicalnetworksresponse.physicalnetwork;
                  if(items != null && items.length > 0)
                    physicalNetworkId = items[0].id
                }
              });
              if(physicalNetworkId == null) {
                alert("error: listPhysicalNetworks API doesn't return Physical Network ID");
                return;
              }

              $.ajax({
                url: createURL("updatePhysicalNetwork&state=Enabled&id=" + physicalNetworkId),
                dataType: "json",
                success: function(json) {
                  var jobId = json.updatephysicalnetworkresponse.jobid;
                  var timerKey = "updatePhysicalNetworkJob_"+jobId;
                  $("body").everyTime(2000, timerKey, function() {
                    $.ajax({
                      url: createURL("queryAsyncJobResult&jobId="+jobId),
                      dataType: "json",
                      success: function(json) {
                        var result = json.queryasyncjobresultresponse;
                        if (result.jobstatus == 0) {
                          return; //Job has not completed
                        }
                        else {
                          $("body").stopTime(timerKey);
                          if (result.jobstatus == 1) {
                            //alert("updatePhysicalNetwork succeeded.");

                            // get network service provider ID of Virtual Router
                            var networkServiceProviderId;
                            $.ajax({
                              url: createURL("listNetworkServiceProviders&name=VirtualRouter&physicalNetworkId=" + physicalNetworkId),
                              dataType: "json",
                              async: false,
                              success: function(json) {
                                var items = json.listnetworkserviceprovidersresponse.networkserviceprovider;
                                if(items != null && items.length > 0) {
                                  networkServiceProviderId = items[0].id;
                                }
                              }
                            });
                            if(networkServiceProviderId == null) {
                              alert("error: listNetworkServiceProviders API doesn't return Network Service Provider ID");
                              return;
                            }

                            var virtualRouterElementId;
                            $.ajax({
                              url: createURL("listVirtualRouterElements&nspid=" + networkServiceProviderId),
                              dataType: "json",
                              async: false,
                              success: function(json) {
                                var items = json.listvirtualrouterelementsresponse.virtualrouterelement;
                                if(items != null && items.length > 0) {
                                  virtualRouterElementId = items[0].id;
                                }
                              }
                            });
                            if(virtualRouterElementId == null) {
                              alert("error: listVirtualRouterElements API doesn't return Virtual Router Element Id");
                              return;
                            }

                            $.ajax({
                              url: createURL("configureVirtualRouterElement&enabled=true&id=" + virtualRouterElementId),
                              dataType: "json",
                              async: false,
                              success: function(json) {
                                var jobId = json.configurevirtualrouterelementresponse.jobid;
                                var timerKey = "configureVirtualRouterElementJob_"+jobId;
                                $("body").everyTime(2000, timerKey, function() {
                                  $.ajax({
                                    url: createURL("queryAsyncJobResult&jobId="+jobId),
                                    dataType: "json",
                                    success: function(json) {
                                      var result = json.queryasyncjobresultresponse;
                                      if (result.jobstatus == 0) {
                                        return; //Job has not completed
                                      }
                                      else {
                                        $("body").stopTime(timerKey);
                                        if (result.jobstatus == 1) {
                                          //alert("configureVirtualRouterElement succeeded.");

                                          $.ajax({
                                            url: createURL("updateNetworkServiceProvider&state=Enabled&id=" + networkServiceProviderId),
                                            dataType: "json",
                                            async: false,
                                            success: function(json) {
                                              var jobId = json.updatenetworkserviceproviderresponse.jobid;
                                              var timerKey = "updateNetworkServiceProviderJob_"+jobId;
                                              $("body").everyTime(2000, timerKey, function() {
                                                $.ajax({
                                                  url: createURL("queryAsyncJobResult&jobId="+jobId),
                                                  dataType: "json",
                                                  success: function(json) {
                                                    var result = json.queryasyncjobresultresponse;
                                                    if (result.jobstatus == 0) {
                                                      return; //Job has not completed
                                                    }
                                                    else {
                                                      $("body").stopTime(timerKey);
                                                      if (result.jobstatus == 1) {}
                                                      else if (result.jobstatus == 2) {
                                                        alert("updateNetworkServiceProvider failed. Error: " + fromdb(result.jobresult.errortext));
                                                      }

                                                      args.complete({ data: { zone: zoneObj } });
                                                    }
                                                  },
                                                  error: function(XMLHttpResponse) {
                                                    var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
                                                    alert("updateNetworkServiceProvider failed. Error: " + errorMsg);
                                                  }
                                                });
                                              });
                                            }
                                          });
                                        }
                                        else if (result.jobstatus == 2) {
                                          alert("configureVirtualRouterElement failed. Error: " + fromdb(result.jobresult.errortext));
                                        }
                                      }
                                    },
                                    error: function(XMLHttpResponse) {
                                      var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
                                      alert("configureVirtualRouterElement failed. Error: " + errorMsg);
                                    }
                                  });
                                });
                              }
                            });
                          }
                          else if (result.jobstatus == 2) {
                            alert("updatePhysicalNetwork failed. Error: " + fromdb(result.jobresult.errortext));
                          }
                        }
                      },
                      error: function(XMLHttpResponse) {
                        var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
                        alert("updatePhysicalNetwork failed. Error: " + errorMsg);
                      }
                    });
                  });
                }
              });
              //NaaS (end)
            },
            error: function(XMLHttpResponse) {
              var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
              args.response.error(errorMsg);
            }
          });
        };

        addZoneAction({ data: data.zone, complete: createPod });
      };

      var createPod = function(args) {
        var array1 = [];
        array1.push("&zoneId=" + args.data.zone.id);
        array1.push("&name=" + todb(data.pod.name));
        array1.push("&gateway=" + todb(data.pod.gateway));
        array1.push("&netmask=" + todb(data.pod.netmask));
        array1.push("&startIp=" + todb(data.pod.startip));

        var endip = data.pod.endip;      //optional
        if (endip != null && endip.length > 0)
          array1.push("&endIp=" + todb(endip));

        $.ajax({
          url: createURL("createPod" + array1.join("")),
          dataType: "json",
          success: function(json) {
            var item = json.createpodresponse.pod;
            createNetwork({ data: $.extend(args.data, { pod: item })});
          },
          error: function(XMLHttpResponse) {
            var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
            args.response.error(errorMsg);
          }
        });
      };

      var createNetwork = function(args) {
        var createNetworkAction = function(selectedZoneObj, args) {
          var array1 = [];
          array1.push("&zoneId=" + selectedZoneObj.id);
          array1.push("&name=" + todb(args.data.name));
          array1.push("&displayText=" + todb(args.data.description));
          array1.push("&networkOfferingId=" + args.data.networkOfferingId);

          if(selectedZoneObj.networktype == "Basic") {
            array1.push("&vlan=untagged");
          }
          else {  //"Advanced"
            if (args.data.vlanTagged == "tagged")
              array1.push("&vlan=" + todb(args.data.vlanId));
            else
              array1.push("&vlan=untagged");

            var $form = args.$form;

            if($form.find('.form-item[rel=domainId]').css("display") != "none") {
              if($form.find('.form-item[rel=account]').css("display") != "none") {  //account-specific
                array1.push("&acltype=account");
                array1.push("&domainId=" + args.data.domainId);
                array1.push("&account=" + args.data.account);
              }
              else {  //domain-specific
                array1.push("&acltype=domain");
                array1.push("&domainId=" + args.data.domainId);
              }
            }
            else { //zone-wide
              array1.push("&acltype=domain"); //server-side will make it Root domain (i.e. domainid=1)
            }

            array1.push("&isDefault=" + (args.data.isDefault=="on"));
            array1.push("&gateway=" + args.data.guestGateway);
            array1.push("&netmask=" + args.data.guestNetmask);
            array1.push("&startip=" + args.data.guestStartIp);
            array1.push("&endip=" + args.data.guestEndIp);

            if(args.data.networkdomain != null && args.data.networkdomain.length > 0)
              array1.push("&networkdomain=" + todb(args.data.networkdomain));
          }

          $.ajax({
            url: createURL("createNetwork" + array1.join("")),
            dataType: "json",
            success: function(json) {
              var item = json.createnetworkresponse.network;

              args.response.success({data:item});

              if(selectedZoneObj.networktype == "Basic") {
                var array2 = [];

                var podId;
                if(args.data.podId != "0") {
                  podId = args.data.podId;
                }
                else { //args.data.podId==0, create pod first
                  var array1 = [];
                  array1.push("&zoneId=" + selectedZoneObj.id);
                  array1.push("&name=" + todb(args.data.podname));
                  array1.push("&gateway=" + todb(args.data.reservedSystemGateway));
                  array1.push("&netmask=" + todb(args.data.reservedSystemNetmask));
                  array1.push("&startIp=" + todb(args.data.reservedSystemStartIp));

                  var endip = args.data.reservedSystemEndIp;      //optional
                  if (endip != null && endip.length > 0)
                    array1.push("&endIp=" + todb(endip));

                  $.ajax({
                    url: createURL("createPod" + array1.join("")),
                    dataType: "json",
                    async: false,
                    success: function(json) {
                      var item = json.createpodresponse.pod;
                      podId = item.id;
                    },
                    error: function(XMLHttpResponse) {
                      //var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
                      //args.response.error(errorMsg);
                    }
                  });
                }
                if(podId == null)  {
                  alert("podId is null, so unable to create IP range on pod level");
                  return;
                }

                array2.push("&podId=" + podId);
                array2.push("&vlan=untagged");
                array2.push("&zoneid=" + selectedZoneObj.id);
                array2.push("&forVirtualNetwork=false"); //direct VLAN
                array2.push("&gateway=" + todb(args.data.guestGateway));
                array2.push("&netmask=" + todb(args.data.guestNetmask));
                array2.push("&startip=" + todb(args.data.guestStartIp));
                var endip = args.data.guestEndIp;
                if(endip != null && endip.length > 0)
                  array2.push("&endip=" + todb(endip));
                $.ajax({
                  url: createURL("createVlanIpRange" + array2.join("")),
                  dataType: "json",
                  async: false,
                  success: function(json) {
                    //var item = json.createvlaniprangeresponse.vlan;
                  },
                  error: function(XMLHttpResponse) {
                    //var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
                    //args.response.error(errorMsg);
                  }
                });

              }
            },
            error: function(XMLHttpResponse) {
              var errorMsg = parseXMLHttpResponse(XMLHttpResponse);
              args.response.error(errorMsg);
            }
          });
        };

        // Get default network offering ID
        var networkOfferingID;
        $.ajax({
          url: createURL("listNetworkOfferings&guestiptype=Shared"),
          dataType: "json",
          async: true,
          success: function(json) {
            var networkOfferings = json.listnetworkofferingsresponse.networkoffering;
            networkOfferingID = $.grep(networkOfferings, function(elem) {
              return elem.name == 'DefaultSharedNetworkOffering';
            })[0].id;

            createNetworkAction(args.data.zone, {
              response: {
                success: function(successArgs) {
                  createCluster({ data: $.extend(args.data, { guestNetwork: successArgs.data })});
                }
              },
              data: {
                name: data.guestNetwork.name,
                description: data.guestNetwork.description,
                podId: args.data.pod.id,
                guestGateway: data.guestNetwork.guestGateway,
                guestNetmask: data.guestNetwork.guestNetmask,
                guestStartIp: data.guestNetwork.guestStartIp,
                guestEndIp: data.guestNetwork.guestEndIp,
                networkOfferingId: networkOfferingID
              }
            });
          }
        });
      };

      var createCluster = function(args) {
        $.ajax({
          url: createURL('addCluster'),
          data: {
            clustername: data.cluster.name,
            podid: args.data.pod.id,
            zoneid: args.data.zone.id,
            hypervisor: data.cluster.hypervisor,
            clustertype: 'CloudManaged'
          },
          dataType: 'json',
          async: true,
          success: function(data) {
            createHost({
              data: $.extend(args.data, {
                cluster: data.addclusterresponse.cluster[0]
              })
            });
          }
        });
      };

      var createHost = function(args) {
        $.ajax({
          url: createURL('addHost'),
          data: {
            clustername: args.data.cluster.name,
            zoneid: args.data.zone.id,
            podid: args.data.pod.id,
            hypervisor: 'XenServer',
            clustertype: 'CloudManaged',
            url: 'http://' + data.host.hostname,
            username: data.host.username,
            password: data.host.password
          },
          dataType: 'json',
          async: true,
          success: function(data) {
            createPrimaryStorage({
              data: $.extend(args.data, {
                host: data.addhostresponse.host[0]
              })
            });
          }
        });
      };

      var createPrimaryStorage = function(args) {
        $.ajax({
          url: createURL('createStoragePool'),
          data: {
            name: data.primaryStorage.name,
            clusterid: args.data.cluster.id,
            zoneid: args.data.zone.id,
            podid: args.data.pod.id,
            hypervisor: 'XenServer',
            clustertype: 'CloudManaged',
            url: 'nfs://' + data.primaryStorage.server + data.primaryStorage.path
          },
          dataType: 'json',
          async: true,
          success: function(data) {
            createSecondaryStorage({
              data: $.extend(args.data, {
                host: data.createstoragepoolresponse.storagepool
              })
            });
          }
        });
      };

      var createSecondaryStorage = function(args) {
        $.ajax({
          url: createURL('addSecondaryStorage'),
          data: {
            clusterid: args.data.cluster.id,
            zoneid: args.data.zone.id,
            url: 'nfs://' + data.secondaryStorage.nfsServer + data.secondaryStorage.path
          },
          dataType: 'json',
          async: true,
          success: function(data) {
            pollSystemVMs();
          }
        });
      };

      var pollSystemVMs = function() {
        var poll = setInterval(function() {
          $.ajax({
            url: createURL('listSystemVms'),
            dataType: 'json',
            async: true,
            success: function(data) {
              var systemVMs = data.listsystemvmsresponse.systemvm;

              if (systemVMs && systemVMs.length > 1) {
                if (systemVMs.length == $.grep(systemVMs, function(vm) {
                  return vm.state == 'Running';
                }).length) {
                  clearInterval(poll);
                  complete();
                }                
              }
            }
          });
        }, 1000);
      };

      createZone();
    }
  };
}(jQuery, cloudStack, testData));
