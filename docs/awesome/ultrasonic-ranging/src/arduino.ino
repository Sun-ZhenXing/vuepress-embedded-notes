#define LED_A 2
#define LED_B 3
#define LED_C 4
#define LED_D 5
#define LED_E 6
#define LED_F 7
#define LED_G 8

// 分别连接三个灯 S1、S2、S3
#define LED_1 9
#define LED_2 10
#define LED_3 11

#define pingPin 13  // 超声波 Pin
#define echoPin 12  // 超声波 Echo

// 默认延迟时间
#define LED_DELAY 1

// 数字的字形
// 每一个位分别对应 Dot|G|F|E|D|C|B|A
const unsigned char NUM_7_SEG[] = {
    0b0111111,
    0b0000110,
    0b1011011,
    0b1001111,
    0b1100110,
    0b1101101,
    0b1111101,
    0b0000111,
    0b1111111,
    0b1101111
};

// 将测量时间换算为距离
long microsecondsToCentimeters(long microseconds) {
    return microseconds / 29 / 2;
}

// 清空屏幕
void clear() {
    digitalWrite(LED_1, HIGH);
    digitalWrite(LED_2, HIGH);
    digitalWrite(LED_3, HIGH);
    digitalWrite(LED_A, LOW);
    digitalWrite(LED_B, LOW);
    digitalWrite(LED_C, LOW);
    digitalWrite(LED_D, LOW);
    digitalWrite(LED_E, LOW);
    digitalWrite(LED_F, LOW);
    digitalWrite(LED_G, LOW);
}

// 绘制一个数字
void draw_digital(int number, int s) {
    if (s == 1) {
        digitalWrite(LED_1, LOW);
        digitalWrite(LED_2, HIGH);
        digitalWrite(LED_3, HIGH);
    } else if (s == 2) {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, LOW);
        digitalWrite(LED_3, HIGH);
    } else {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, HIGH);
        digitalWrite(LED_3, LOW);
    }
    unsigned char seg = NUM_7_SEG[number];
    int i = 0;
    for (i = 0; i < 7; i++) {
        if (seg & 1) {
            digitalWrite(LED_A + i, HIGH);
        } else {
            digitalWrite(LED_A + i, LOW);
        }
        seg >>= 1;
    }
}

// 绘制一个数值
void show_number(int num) {
    int hund = num / 100;
    int tens = (num % 100) / 10;
    int ones = num % 10;
    if (num >= 100) {
        draw_digital(hund, 1);
        delay(LED_DELAY);
    }
    if (num >= 10) {
        draw_digital(tens, 2);
        delay(LED_DELAY);
    }
    draw_digital(ones, 3);
    delay(LED_DELAY);
}

void setup() {
    Serial.begin(9600);
    pinMode(pingPin, OUTPUT);
    pinMode(echoPin, INPUT);

    pinMode(LED_1, OUTPUT);
    pinMode(LED_2, OUTPUT);
    pinMode(LED_3, OUTPUT);
    pinMode(LED_A, OUTPUT);
    pinMode(LED_B, OUTPUT);
    pinMode(LED_C, OUTPUT);
    pinMode(LED_D, OUTPUT);
    pinMode(LED_E, OUTPUT);
    pinMode(LED_F, OUTPUT);
    pinMode(LED_G, OUTPUT);
    clear();
    delay(LED_DELAY);
}

void loop() {
    long duration, cm;
    digitalWrite(pingPin, LOW);
    delayMicroseconds(2);
    digitalWrite(pingPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(pingPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    cm = microsecondsToCentimeters(duration);
    Serial.print(cm);
    Serial.println("cm");
    int i = 15;
    // 延迟绘制
    while (i--) {
        if (cm < 1000 && cm >= 0) {
            show_number(cm);
        }
        delay(10);
        clear();
        delay(LED_DELAY);
    }

}
