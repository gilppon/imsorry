# Manager Kim 리그 계약

현재 실제 플레이는 `ManagerKim.tsx` SVG 리그입니다. 루트 골반 (260, 291), 수직 척추 방향을 0도로 정의하고 torso 그룹에 rotate(bowAngle)를 적용합니다. 90°는 척추가 오른쪽 수평이며, 120°는 아래쪽으로 30° 더 내려갑니다. 도게자는 골반을 낮추고 별도 무릎/정강이 포즈를 렌더링합니다. 생성 이미지의 시각적 각도는 판정에 사용하지 않습니다.

## Rive 제작 시 State Machine: ManagerKim

- Number: bowAngle [0..125], fear [0..1], sweatLevel [0..1], damageMess [0..1], breath [0..1]
- Boolean: isHoldingBow, isDogeza, isRecovering
- Trigger: questionShock, sweatBurst, eggImpact, tomatoImpact, pieImpact, coffeeImpact, perfectApology, comboBreak
- State: idle_nervous, listen, brace, bow_blend, bow_hold, bow_recover, dogeza_enter, dogeza_hold, dogeza_recover, projectile_hit, victory_relief, collapse_from_stress

Transition contract:

1. idle_nervous -> listen on questionShock, with pupils jitter and fear lift.
2. bowAngle > 0 -> brace -> bow_blend. Torso has single pelvis-parent rotation, driven by continuous numeric input, not independently generated image poses.
3. isHoldingBow -> bow_hold. isRecovering -> bow_recover -> idle_nervous.
4. isDogeza -> dogeza_enter -> dogeza_hold. Clearing isDogeza -> dogeza_recover.
5. Impact triggers overlay a nonviolent food mess animation without changing measured bowAngle.
6. perfectApology triggers teal/gold sparkle without hidden timing adjustments. comboBreak increases fear.
7. Victory -> victory_relief, trust=0 -> collapse_from_stress, never injury.

`@rive-app/webgl2` dependency is available. A real author-authored .riv asset is required to instantiate this state machine. Do not replace it with a mislabeled SVG or generated arbitrary binary. Once the file is provided, initialize Rive with canvas, src, autoplay and stateMachines: ManagerKim, then set real stateMachineInputs values. SVG remains the offline/error fallback.

The background illustration is concept art only; it is not used for angle judgment. The live rig identity is internally consistent at every angle.
