# Rock 3 系列 GPIO

GPIO 硬件版本 1.2，详细信息请查阅参考文献。[^1]

[^1]: General purpose input-output (GPIO)，Radxa Wiki，<https://wiki.radxa.com/Rock3/hardware/gpio>

<table>
    <tbody>
        <tr style="font-weight:bold; text-align:center;">
            <th> GPIO number</th>
            <th> Function4</th>
            <th> Function3</th>
            <th> Function2</th>
            <th> Function1</th>
            <th> Pin#</th>
            <th></th>
            <th> Pin#</th>
            <th> Function1</th>
            <th> Function2</th>
            <th> Function3</th>
            <th> Function4</th>
            <th> GPIO number</th>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> +3.3V</td>
            <td style="background-color:#FF0;"> 1</td>
            <td></td>
            <td style="background-color:#F00;"> 2</td>
            <td> +5.0V</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 32</td>
            <td> CAN1_RX_M0</td>
            <td> UART3_RX_M0</td>
            <td> I2C3_SDA_M0</td>
            <td> GPIO1_A0</td>
            <td style="background-color:#008000; color:#FFF;"> 3</td>
            <td></td>
            <td style="background-color:#F00;"> 4</td>
            <td> +5.0V</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 33</td>
            <td> CAN1_TX_M0</td>
            <td> UART3_TX_M0</td>
            <td> I2C3_SCL_M0</td>
            <td> GPIO1_A1</td>
            <td style="background-color:#008000; color:#FFF;"> 5</td>
            <td></td>
            <td style="background-color:#000; color:#FFF"> 6</td>
            <td> GND</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 111</td>
            <td></td>
            <td> UART3_TX_M1</td>
            <td> PWM12_M0</td>
            <td> GPIO3_B7</td>
            <td style="background-color:#008000; color:#FFF;"> 7</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 8</td>
            <td> GPIO0_D1</td>
            <td style="background-color:#FFA500;"> UART2_TXD</td>
            <td></td>
            <td></td>
            <td> 25</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> GND</td>
            <td style="background-color:#000; color:#FFF"> 9</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 10</td>
            <td> GPIO0_D0</td>
            <td style="background-color:#FFA500;"> UART2_RXD</td>
            <td></td>
            <td></td>
            <td> 24</td>
        </tr>
        <tr>
            <td> 116</td>
            <td></td>
            <td> UART7_TX_M1</td>
            <td> PWM14_M0</td>
            <td> GPIO3_C4</td>
            <td style="background-color:#008000; color:#FFF;"> 11</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 12</td>
            <td> GPIO3_A3</td>
            <td></td>
            <td></td>
            <td></td>
            <td> 99</td>
        </tr>
        <tr>
            <td> 117</td>
            <td></td>
            <td> UART7_RX_M1</td>
            <td> PWM15_IR_M0</td>
            <td> GPIO3_C5</td>
            <td style="background-color:#008000; color:#FFF;"> 13</td>
            <td></td>
            <td style="background-color:#000; color:#FFF"> 14</td>
            <td> GND</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 16</td>
            <td></td>
            <td> UART0_RX</td>
            <td> PWM1_M0</td>
            <td> GPIO0_C0</td>
            <td style="background-color:#008000; color:#FFF;"> 15</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 16</td>
            <td> GPIO3_A1</td>
            <td> SPI1_CS0_M1</td>
            <td></td>
            <td></td>
            <td> 97</td>
        </tr>
        <tr>
            <td> 17</td>
            <td></td>
            <td> UART0_TX</td>
            <td> PWM2_M0</td>
            <td> GPIO0_C1</td>
            <td style="background-color:#FF0;"> 17</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 18</td>
            <td> GPIO3_B2</td>
            <td> UART4_TX_M1</td>
            <td> PWM9_M0</td>
            <td></td>
            <td> 106</td>
        </tr>
        <tr>
            <td> 147</td>
            <td> CAN1_TX_M1</td>
            <td> SPI3_MOSI_M1</td>
            <td> PWM15_IR_M1</td>
            <td> GPIO4_C3</td>
            <td style="background-color:#008000; color:#FFF;"> 19</td>
            <td></td>
            <td style="background-color:#000; color:#FFF"> 20</td>
            <td> GND</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 149</td>
            <td> UART9_TX_M1</td>
            <td> SPI3_MISO_M1</td>
            <td> PWM12_M1</td>
            <td> GPIO4_C5</td>
            <td style="background-color:#008000; color:#FFF;"> 21</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 22</td>
            <td> ADC_IN5</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 146</td>
            <td> CAN1_TX_M1</td>
            <td> SPI3_CLK_M1</td>
            <td> PWM14_M1</td>
            <td> GPIO4_C2</td>
            <td style="background-color:#008000; color:#FFF;"> 23</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 24</td>
            <td> GPIO4_C6</td>
            <td> PWM13_M1</td>
            <td> SPI3_CS0_M1</td>
            <td> UART9_RX_M1</td>
            <td> 150</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> GND</td>
            <td style="background-color:#000; color:#FFF"> 25</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 26</td>
            <td> GPIO4_D1</td>
            <td> SPI3_CS1_M1</td>
            <td></td>
            <td></td>
            <td> 153</td>
        </tr>
        <tr>
            <td> 14</td>
            <td> PWM2_M1</td>
            <td> SPI0_MOSI_M0</td>
            <td> I2C2_SDA_M0</td>
            <td> GPIO0_B6</td>
            <td style="background-color:#00F; color:#FFF;"> 27</td>
            <td></td>
            <td style="background-color:#00F; color:#FFF;"> 28</td>
            <td> GPIO0_B5</td>
            <td> I2C2_CLK_M0</td>
            <td> SPI0_CLK_M0</td>
            <td> PWM1_M1</td>
            <td> 13</td>
        </tr>
        <tr>
            <td> 95</td>
            <td></td>
            <td> UART8_TX_M1</td>
            <td> SPI2_MISO_M1</td>
            <td> GPIO2_D7</td>
            <td style="background-color:#008000; color:#FFF;"> 29</td>
            <td></td>
            <td style="background-color:#000; color:#FFF"> 30</td>
            <td> GND</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 96</td>
            <td></td>
            <td> UART8_RX_M1</td>
            <td> SPI2_CLK_M1</td>
            <td> GPIO3_A0</td>
            <td style="background-color:#008000; color:#FFF;"> 31</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 32</td>
            <td> GPIO3_C2</td>
            <td> SPI1_MISO_M1</td>
            <td> UART5_TX_M1</td>
            <td></td>
            <td> 114</td>
        </tr>
        <tr>
            <td> 115</td>
            <td></td>
            <td> UART5_RX_M1</td>
            <td> SPI1_CLK_M1</td>
            <td> GPIO3_C3</td>
            <td style="background-color:#008000; color:#FFF;"> 33</td>
            <td></td>
            <td style="background-color:#000; color:#FFF"> 34</td>
            <td> GND</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> 100</td>
            <td></td>
            <td></td>
            <td></td>
            <td> GPIO3_A4</td>
            <td style="background-color:#008000; color:#FFF;"> 35</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 36</td>
            <td> GPIO3_A2</td>
            <td></td>
            <td></td>
            <td></td>
            <td> 98</td>
        </tr>
        <tr>
            <td> 112</td>
            <td></td>
            <td> UART3_RX_M1</td>
            <td> PWM13_M0</td>
            <td> GPIO3_C0</td>
            <td style="background-color:#008000; color:#FFF;"> 37</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 38</td>
            <td> GPIO3_A6</td>
            <td></td>
            <td></td>
            <td></td>
            <td> 102</td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td> GND</td>
            <td style="background-color:#000; color:#FFF"> 39</td>
            <td></td>
            <td style="background-color:#008000; color:#FFF;"> 40</td>
            <td> GPIO3_A5</td>
            <td></td>
            <td></td>
            <td></td>
            <td> 101</td>
        </tr>
    </tbody>
</table>
