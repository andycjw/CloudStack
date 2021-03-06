/**
 *  Copyright (C) 2010 Cloud.com, Inc.  All rights reserved.
 * 
 * This software is licensed under the GNU General Public License v3 or later.
 * 
 * It is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

package com.cloud.api.commands;

import org.apache.log4j.Logger;


import com.cloud.api.ApiConstants;
import com.cloud.api.BaseCmd;
import com.cloud.api.IdentityMapper;
import com.cloud.api.Implementation;
import com.cloud.api.Parameter;
import com.cloud.api.ServerApiException;
import com.cloud.api.BaseCmd.CommandType;
import com.cloud.api.response.RegisterResponse;
import com.cloud.api.response.SuccessResponse;
import com.cloud.user.Account;

@Implementation(description = "Update password of a host/pool on management server.", responseObject = SuccessResponse.class)
public class UpdateHostPasswordCmd extends BaseCmd {
    public static final Logger s_logger = Logger.getLogger(UpdateHostPasswordCmd.class.getName());

    private static final String s_name = "updatehostpasswordresponse";

    // ///////////////////////////////////////////////////
    // ////////////// API parameters /////////////////////
    // ///////////////////////////////////////////////////

    @IdentityMapper(entityTableName="host")
    @Parameter(name=ApiConstants.HOST_ID, type=CommandType.LONG, description="the host ID")
    private Long hostId;

    @IdentityMapper(entityTableName="cluster")
    @Parameter(name=ApiConstants.CLUSTER_ID, type=CommandType.LONG, description="the cluster ID for the host")
    private Long clusterId;

    @Parameter(name=ApiConstants.USERNAME, type=CommandType.STRING, required=true, description="the username for the host/cluster")
    private String username;
    
    @Parameter(name=ApiConstants.PASSWORD, type=CommandType.STRING, required=true, description="the password for the host/cluster")
    private String password;

    // ///////////////////////////////////////////////////
    // ///////////////// Accessors ///////////////////////
    // ///////////////////////////////////////////////////

    public Long getHostId() {
        return hostId;
    }
    
    public Long getClusterId() {
        return clusterId;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }
    
    // ///////////////////////////////////////////////////
    // ///////////// API Implementation///////////////////
    // ///////////////////////////////////////////////////

    @Override
    public String getCommandName() {
        return s_name;
    }

    @Override
    public long getEntityOwnerId() {
        return Account.ACCOUNT_ID_SYSTEM;
    }

    @Override
    public void execute() {
        _mgr.updateHostPassword(this);
        _resourceService.updateHostPassword(this);
        this.setResponseObject(new SuccessResponse(getCommandName()));
    }
}