/**
 * Copyright (C) 2011 Citrix Systems, Inc.  All rights reserved
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

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.cloud.api.ApiConstants;
import com.cloud.api.BaseListCmd;
import com.cloud.api.IdentityMapper;
import com.cloud.api.Implementation;
import com.cloud.api.Parameter;
import com.cloud.api.response.LBStickinessResponse;
import com.cloud.api.response.ListResponse;
import com.cloud.network.rules.StickinessPolicy;
import com.cloud.network.rules.LoadBalancer;


@Implementation(description = "Lists LBStickiness policies.", responseObject = LBStickinessResponse.class)
public class ListLBStickinessPoliciesCmd extends BaseListCmd {
    public static final Logger s_logger = Logger
            .getLogger(ListLBStickinessPoliciesCmd.class.getName());

    private static final String s_name = "listlbstickinesspoliciesresponse";

    // ///////////////////////////////////////////////////
    // ////////////// API parameters /////////////////////
    // ///////////////////////////////////////////////////
    @IdentityMapper(entityTableName="firewall_rules")
    @Parameter(name = ApiConstants.LBID, type = CommandType.LONG, required = true, description = "the ID of the load balancer rule")
    private Long lbRuleId;
    


    // ///////////////////////////////////////////////////
    // ///////////////// Accessors ///////////////////////
    // ///////////////////////////////////////////////////
    public Long getLbRuleId() {
        return lbRuleId;
    }
    


    // ///////////////////////////////////////////////////
    // ///////////// API Implementation///////////////////
    // ///////////////////////////////////////////////////

    @Override
    public String getCommandName() {
        return s_name;
    }

    @Override
    public void execute() {
        List<LBStickinessResponse> spResponses = new ArrayList<LBStickinessResponse>();
        LoadBalancer lb = _lbService.findById(getLbRuleId());
        ListResponse<LBStickinessResponse> response = new ListResponse<LBStickinessResponse>();
        
        if (lb != null) {
            List<? extends StickinessPolicy> stickinessPolicies = _lbService.searchForLBStickinessPolicies(this);

            LBStickinessResponse spResponse = _responseGenerator.createLBStickinessPolicyResponse(stickinessPolicies, lb);
            spResponses.add(spResponse);
            response.setResponses(spResponses);
        }
        
        response.setResponseName(getCommandName());
        this.setResponseObject(response);
    }

}
