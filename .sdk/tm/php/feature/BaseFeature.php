<?php
declare(strict_types=1);

// FlyffGame SDK base feature

class FlyffGameBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FlyffGameContext $ctx, array $options): void {}
    public function PostConstruct(FlyffGameContext $ctx): void {}
    public function PostConstructEntity(FlyffGameContext $ctx): void {}
    public function SetData(FlyffGameContext $ctx): void {}
    public function GetData(FlyffGameContext $ctx): void {}
    public function GetMatch(FlyffGameContext $ctx): void {}
    public function SetMatch(FlyffGameContext $ctx): void {}
    public function PrePoint(FlyffGameContext $ctx): void {}
    public function PreSpec(FlyffGameContext $ctx): void {}
    public function PreRequest(FlyffGameContext $ctx): void {}
    public function PreResponse(FlyffGameContext $ctx): void {}
    public function PreResult(FlyffGameContext $ctx): void {}
    public function PreDone(FlyffGameContext $ctx): void {}
    public function PreUnexpected(FlyffGameContext $ctx): void {}
}
