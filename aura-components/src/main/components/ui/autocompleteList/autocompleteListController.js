/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
({
    handleClick: function(component, event, helper) {
        var targetCmp = helper.getEventSourceComponent(component, event);
        var selectEvt = component.get("e.selectListOption");
        selectEvt.setParams({
            option: targetCmp
        });
        selectEvt.fire();
    },
    
    handleKeydown: function(component, event, helper) {
        helper.handleKeydown(component, event);
    },
    
    handleMouseover: function(component, event, helper) {
        var targetCmp = helper.getEventSourceComponent(component, event);
        var focusEvent = targetCmp.get("e.focus");
        if (focusEvent) {
            focusEvent.fire();
        }
    },
    
    matchText: function(component, event, helper) {
        helper.matchText(component, event.getParam("keyword"));
    }
})