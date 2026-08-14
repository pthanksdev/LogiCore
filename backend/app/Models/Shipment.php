<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Shipment extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'tracking_id',
        'cust_id',
        'carrier',
        'origin',
        'destination',
        'status',
        'temperature',
        'eta',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'cust_id', 'cust_id');
    }
}
