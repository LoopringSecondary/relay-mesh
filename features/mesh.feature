Feature: Tests related to Relayers

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants
        """
        [
        {"$class":"org.loopring.relay.mesh.Relayer", "email":"relay1@loopring.org", "type": "RELAYER", "desp":"test relayer"},
        {"$class":"org.loopring.relay.mesh.Maker", "email":"maker1@loopring.org", "type": "MAKER", "desp":"test relayer"},
        ]
        """
        And I have issued the participant org.loopring.relay.mesh.Relayer#relay1@loopring.org with the identity relay1
        And I have added the following asset of type org.loopring.relay.mesh.Order
        """
        {
            "$class":"org.loopring.relay.mesh.Order",
            "hash":"0x111",
            "protocol":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x847983c3a34afa192cfee860698584c030f4c9db1"},
            "tokenS" : "LRC",
            "tokenB" : "WETH",
            "amountS" : "0x123",
            "amountB" : "0x3a43",
            "timestamp": "0x9178733",
            "ttl": "0x773",
            "salt" : "0x1293",
            "lrcFee" : "0x3",
            "buyNoMoreThanAmountB" : true,
            "marginSplitPercentage" : 50,
            "v" : 112,
            "r" : "239dskjfsn23ck34323434md93jchek3",
            "s" : "dsfsdf234ccvcbdsfsdf23438cjdkldy",
            "owner":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x747983c3a34afa192cfee860698584c030f4c9db1"},
            "relayer" : "resource:org.loopring.relay.mesh.Relayer#relay1@loopring.org",
            "maker" : "resource:org.loopring.relay.mesh.Maker#maker1@loopring.org"
        }
        """

    Scenario: Relay1 can read order
        Then I should have the following participants
        """
        [
        {"$class":"org.loopring.relay.mesh.Relayer", "email":"relay1@loopring.org", "type": "RELAYER", "desp":"test relayer"}
        ]
        """
    
    Scenario: relay1 invokes the OrderReceived transaction
        And I submit the following transaction of type org.loopring.relay.mesh.OrderReceived
        """
        {
            "$class":"org.loopring.relay.mesh.Order",
            "hash":"0x222",
            "protocol":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x847983c3a34afa192cfee860698584c030f4c9db1"},
            "tokenS" : "LRC",
            "tokenB" : "WETH",
            "amountS" : "0x123",
            "amountB" : "0x3a43",
            "timestamp" : "0x9178733",
            "ttl": "0x773",
            "salt" : "0x1293",
            "lrcFee" : "0x3",
            "buyNoMoreThanAmountB" : true,
            "marginSplitPercentage" : 50,
            "v" : 112,
            "r" : "239dskjfsn23ck34323434md93jchek3",
            "s" : "dsfsdf234ccvcbdsfsdf23438cjdkldy",
            "owner":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x747983c3a34afa192cfee860698584c030f4c9db1"},
            "relayer" : "resource:org.loopring.relay.mesh.Relayer#relay1@loopring.org",
            "maker" : "resource:org.loopring.relay.mesh.Maker#maker1@loopring.org"
        }
        """
        Then I should have received the following event of type org.loopring.relay.mesh.OrderSubmittedEvent
        """
        {
            "order" : {
                "$class":"org.loopring.relay.mesh.Order",
                "hash":"0x222",
                "protocol":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x847983c3a34afa192cfee860698584c030f4c9db1"},
                "tokenS" : "LRC",
                "tokenB" : "WETH",
                "amountS" : "0x123",
                "amountB" : "0x3a43",
                "timestamp" : "0x9178733",
                "ttl": "0x773",
                "salt" : "0x1293",
                "lrcFee" : "0x3",
                "buyNoMoreThanAmountB" : true,
                "marginSplitPercentage" : 50,
                "v" : 112,
                "r" : "239dskjfsn23ck34323434md93jchek3",
                "s" : "dsfsdf234ccvcbdsfsdf23438cjdkldy",
                "owner":{"$class":"org.loopring.relay.mesh.Address", "network":"NEO", "hex": "0x747983c3a34afa192cfee860698584c030f4c9db1"},
                "relayer" : "resource:org.loopring.relay.mesh.Relayer#relay1@loopring.org",
                "maker" : "resource:org.loopring.relay.mesh.Maker#maker1@loopring.org"
            }
        }
        """   