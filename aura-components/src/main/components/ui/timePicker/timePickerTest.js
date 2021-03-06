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
    testHoursAttribute : {
        attributes : {  "hours" : 5 },
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("5", "" + hours, "The item in the hours was not set correctly");
        }
    },
    
    testMinAttribute : {
        attributes : {  "minutes" : 50},
        test : function(cmp) {
            var minutes = cmp.get("minutes").get("v.value");
            $A.test.assertEquals("50", "" + minutes,  "The item in the minutes was not set correctly");
        }
    },
    
    testInputSelNotPreset : {
        attributes : { "is24HourFormat" : true  },
        test : function(cmp) {
            $A.test.assertNull(cmp.get("ampm").getElement(),"The inputSelect for am/pm is rendered and it should not be");
        }
    },
    
    testInputSelPresent : {
        attributes : { "is24HourFormat" : false},
        test : function(cmp) {
            $A.test.assertNotNull(cmp.get("ampm").getElement(),"The inputSelect for am/pm is not rendered and it should be");
        }
    },
    
    /*
     * Two paths that I am testing for: path 1: The initial time the component
     * is being rendered (tests end with initVals) path 2: After the component
     * is being rendered (tests end with AlreadyRendered)
     */

    // These next two test constitute:
    // testValidTimeForPeriodAfterAlreadyRendered
    testErrorMessagesPeriodHours : {
        attributes : {"is24HourFormat" : false},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", 100);
            var evt = {
            "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hoursErrorList = cmp.get("hourError").getElement().children.length;
            $A.test.assertEquals("1","" + hoursErrorList,"Erroroneous input was put in the hours inputInteger component, an error message did not appear");
        }
    },

    testErrorMessagesPeriodMinutes : {
        attributes : { "is24HourFormat" : false},
        test : function(cmp) {
            cmp.get("minutes").setValue("v.value", 100);
            var evt = {
            "getSource" : function() {
                return cmp.get("minutes")
            }
            };
            cmp.get("c.updateMinutes").runDeprecated(evt);

            var minutesErrorList = cmp.get("minuteError").getElement().children.length;
            $A.test.assertEquals( "1","" + minutesErrorList,"Erroroneous input was put in the Minutes inputInteger component, an error message did not appear");
        }
    },

    // These next two tests constitute:
    // testValidTimeFor24HourAfterAlreadyRendered
    testErrorMessages24hrHours : {
        attributes : {"is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", 25);
            var evt = {
                "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hoursErrorList = cmp.get("hourError").getElement().children.length;
            $A.test.assertEquals("1","" + hoursErrorList,"Erroroneous input was put in the hours inputInteger component, an error message did not appear");
        }
    },

    testErrorMessages24hrMinutes : {
        attributes : { "is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("minutes").setValue("v.value", 60);
            var evt = {
            "getSource" : function() {
                return cmp.get("minutes")
            }
            };
            cmp.get("c.updateMinutes").runDeprecated(evt);

            var minutesErrorList = cmp.get("minuteError").getElement().children.length;
            $A.test.assertEquals("1","" + minutesErrorList, "Erroroneous input was put in the Minutes inputInteger component, an error message did not appear");
        }
    },
    
    //Test Boundary Cases for 24 hour
    testValidTimeFor24HourWithInitValsBoundaryAtEnd : {
        attributes : {"is24HourFormat" : true, "hours" : 23,"minutes" : 60},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("23",""+hours, "The item in the hours textbox was not correctly converted from 24hours correctly");
            debugger;
            var minutes = cmp.get("minutes").get("v.value");
            $A.test.assertEquals("00", "" + minutes, "The item in the minutes textbox was not correctly converted ");
        }
    },
    
    testValidTimeFor24HourWithInitValsBoundaryCloseToEnd : {
        attributes : {"is24HourFormat" : true, "hours" : 24,"minutes" : 59},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("0",""+hours, "The item in the hours textbox was not correctly converted from 24hours correctly");

            var minutes = cmp.get("minutes").get("v.value");
            $A.test.assertEquals("59", "" + minutes, "The item in the minutes textbox was not correctly converted ");
        }
    },
    
    testValidTimeFor24HourWithInitValsBoundaryAtBegin : {
        attributes : {"is24HourFormat" : true, "hours" : 00,"minutes" : 00},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("0",""+hours, "The item in the hours textbox was not correctly converted from 24hours correctly");

            var minutes = cmp.get("minutes").get("v.value");
            $A.test.assertEquals("00", "" + minutes, "The item in the minutes textbox was not correctly converted ");
        }
    },
    
    //Test Boundary Cases for period
    testValidTimeForPeriodWithInitValsBoundaryAtBegin : {
        attributes : {"is24HourFormat" : false,"hours" : 01,"minutes" : 00},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("1","" + hours, "The item in the hours textbox was not correctly converted from to 24hours correctly");

            var minutes = cmp.get("minutes").get("v.value");

            $A.test.assertEquals("00", "" + minutes,"The item in the minutes textbox was not correctly converted ");
        }
    },
    
    testValidTimeForPeriodWithInitValsBoundaryAtEnd : {
        attributes : {"is24HourFormat" : false,"hours" : 12,"minutes" : 01},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("12","" + hours, "The item in the hours textbox was not correctly converted from to 24hours correctly");

            var minutes = cmp.get("minutes").get("v.value");

            $A.test.assertEquals("01", "" + minutes,"The item in the minutes textbox was not correctly converted ");
        }
    },
    
    testValidTimeForPeriodWithInitValsBoundaryCloseToEnd : {
        attributes : {"is24HourFormat" : false,"hours" : 11,"minutes" : 59},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("11","" + hours, "The item in the hours textbox was not correctly converted from to 24hours correctly");

            var minutes = cmp.get("minutes").get("v.value");

            $A.test.assertEquals("59", "" + minutes,"The item in the minutes textbox was not correctly converted ");
        }
    },
    
    testInvalidTimeForPeriodOnAfterAlreadyRendered : {
        attributes : {"is24HourFormat" : false},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", 14);
            var evt = {
            "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("14", "" + hours,"The item in the hours textbox was not correctly converted");
        }
    },
    
    //Testing for non number values
    testErrorMessages24hrHoursWithSpecialChar : {
        attributes : {"is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", "$25");
            var evt = {
                "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hoursErrorList = cmp.get("hourError").getElement().children.length;
            $A.test.assertEquals("1","" + hoursErrorList,"Erroroneous input was put in the hours inputInteger component, an error message did not appear");
        }
    },
    
    testErrorMessages24hrHoursWithDecimal : {
        attributes : {"is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", "4.0");
            var evt = {
                "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hoursErrorList = cmp.get("hourError").getElement().children.length;
            $A.test.assertEquals("1","" + hoursErrorList,"Erroroneous input was put in the hours inputInteger component, an error message did not appear");
        }
    },
    
    testErrorMessages24hrHoursWithEmptyString : {
        attributes : {"is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", "");
            var evt = {
                "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hoursErrorList = cmp.get("hourError").getElement().children.length;
            $A.test.assertEquals("1","" + hoursErrorList,"Erroroneous input was put in the hours inputInteger component, an error message did not appear");
        }
    },
   
    testErrorMessagesMinutesWithSpecialCharWithNum : {
        attributes : { "is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("minutes").setValue("v.value", "$25");
            var evt = {
            "getSource" : function() {
                return cmp.get("minutes")
            }
            };
            cmp.get("c.updateMinutes").runDeprecated(evt);

            var minutesErrorList = cmp.get("minuteError").getElement().children.length;
            $A.test.assertEquals("1","" + minutesErrorList, "Erroroneous input was put in the Minutes inputInteger component, an error message did not appear");
        }
    },
    
    testErrorMessagesMinutesWithDecimal : {
        attributes : { "is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("minutes").setValue("v.value", "4.0");
            var evt = {
            "getSource" : function() {
                return cmp.get("minutes")
            }
            };
            cmp.get("c.updateMinutes").runDeprecated(evt);

            var minutesErrorList = cmp.get("minuteError").getElement().children.length;
            $A.test.assertEquals("1","" + minutesErrorList, "Erroroneous input was put in the Minutes inputInteger component, an error message did not appear");
        }
    },
    
    testErrorMessagesMinutesWithEmptyString : {
        attributes : { "is24HourFormat" : true},
        test : function(cmp) {
            cmp.get("minutes").setValue("v.value", "");
            var evt = {
            "getSource" : function() {
                return cmp.get("minutes")
            }
            };
            cmp.get("c.updateMinutes").runDeprecated(evt);

            var minutesErrorList = cmp.get("minuteError").getElement().children.length;
            $A.test.assertEquals("1","" + minutesErrorList, "Erroroneous input was put in the Minutes inputInteger component, an error message did not appear");
        }
    },
    
    // Will work after fix: W-1856385
    testInvalidTimeFor24HourWithInitVals : {
        attributes : {"is24HourFormat" : true,"hours" : 48,"minutes" : 61},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("0", "" + hours,"The item in the hours textbox was not correctly converted");

            var minutes = cmp.get("minutes").get("v.value");
            $A.test .assertEquals("01", "" + minutes,"The item in the minutes textbox was not correctly converted");

        }
    },
    
    // Will work after fix: W-1856385
    testInvalidTimeForPeriodWithInitVals : {
        attributes : {"is24HourFormat" : false,"hours" : 14,"minutes" : 61},
        test : function(cmp) {
            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("2", "" + hours,"The item in the hours textbox was not correctly converted");

            var minutes = cmp.get("minutes").get("v.value");

            $A.test.assertEquals("01", "" + minutes,"The item in the minutes textbox was not correctly converted");
        }
    },
    
    testInvalidTimeFor24HourAfterAlreadyRendered : {
        attributes : {"is24HourFormat" : true,"hours" : 48,"minutes" : 61},
        test : function(cmp) {
            cmp.get("hours").setValue("v.value", 14);
            var evt = {
            "getSource" : function() {
                return cmp.get("hours")
            }
            };
            cmp.get("c.updateHours").runDeprecated(evt);

            var hours = cmp.get("hours").get("v.value");
            $A.test.assertEquals("14", "" + hours, "The item in the hours textbox was not correctly converted");
            var minutes = cmp.get("minutes").get("v.value");
            $A.test.assertEquals("01", "" + minutes, "The item in the minutes textbox was not correctly converted");
        }
    }
})
